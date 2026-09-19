const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("./database");

const router = express.Router();

const JWT_SECRET = "student_hub_secret_key_2026";


// ==================================================
// TOKEN TEKSHIRISH
// ==================================================

function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Avval tizimga kiring."
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token topilmadi."
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Token yaroqsiz yoki muddati tugagan."
        });

    }
}


// ==================================================
// HAFTA KUNLARI
// ==================================================

const allowedDays = [
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
    "Yakshanba"
];


// ==================================================
// FOYDALANUVCHINING SHAXSIY JADVALINI OLISH
// GET /api/schedule
// ==================================================

router.get(
    "/",
    authenticateToken,
    function (req, res) {

        try {

            const schedule = db.prepare(`
                SELECT
                    id,
                    day,
                    start_time,
                    end_time,
                    subject,
                    teacher,
                    room,
                    lesson_type,
                    created_at
                FROM user_schedule
                WHERE user_id = ?
                ORDER BY
                    CASE day
                        WHEN 'Dushanba' THEN 1
                        WHEN 'Seshanba' THEN 2
                        WHEN 'Chorshanba' THEN 3
                        WHEN 'Payshanba' THEN 4
                        WHEN 'Juma' THEN 5
                        WHEN 'Shanba' THEN 6
                        WHEN 'Yakshanba' THEN 7
                        ELSE 8
                    END,
                    start_time ASC
            `).all(req.user.id);


            return res.status(200).json({
                success: true,
                schedule: schedule
            });

        } catch (error) {

            console.error(
                "Jadvalni olish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Jadvalni olishda xatolik yuz berdi."
            });

        }

    }
);


// ==================================================
// YANGI DARS QO'SHISH
// POST /api/schedule
// ==================================================

router.post(
    "/",
    authenticateToken,
    function (req, res) {

        try {

            const {
                day,
                start_time,
                end_time,
                subject,
                teacher,
                room,
                lesson_type
            } = req.body;


            // Majburiy maydonlar

            if (
                !day ||
                !start_time ||
                !end_time ||
                !subject
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Kun, boshlanish vaqti, tugash vaqti va fan nomini kiriting."
                });

            }


            // Hafta kunini tekshirish

            if (!allowedDays.includes(day)) {

                return res.status(400).json({
                    success: false,
                    message: "Hafta kuni noto‘g‘ri."
                });

            }


            // Vaqtni tekshirish

            if (end_time <= start_time) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Tugash vaqti boshlanish vaqtidan keyin bo‘lishi kerak."
                });

            }


            // Darsni bazaga yozish

            const result = db.prepare(`
                INSERT INTO user_schedule (
                    user_id,
                    day,
                    start_time,
                    end_time,
                    subject,
                    teacher,
                    room,
                    lesson_type
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
                req.user.id,
                day,
                start_time,
                end_time,
                subject.trim(),
                teacher ? teacher.trim() : "",
                room ? room.trim() : "",
                lesson_type ? lesson_type.trim() : ""
            );


            const newLesson = db.prepare(`
                SELECT
                    id,
                    day,
                    start_time,
                    end_time,
                    subject,
                    teacher,
                    room,
                    lesson_type,
                    created_at
                FROM user_schedule
                WHERE id = ?
                AND user_id = ?
            `).get(
                result.lastInsertRowid,
                req.user.id
            );


            return res.status(201).json({
                success: true,
                message: "Dars jadvalga qo‘shildi.",
                lesson: newLesson
            });

        } catch (error) {

            console.error(
                "Dars qo‘shish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Darsni qo‘shishda xatolik yuz berdi."
            });

        }

    }
);


// ==================================================
// DARSNI TAHRIRLASH
// PUT /api/schedule/:id
// ==================================================

router.put(
    "/:id",
    authenticateToken,
    function (req, res) {

        try {

            const lessonId = Number(
                req.params.id
            );


            if (
                !Number.isInteger(lessonId) ||
                lessonId <= 0
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Dars ID noto‘g‘ri."
                });

            }


            // Faqat shu userning darsi ekanligini tekshiramiz

            const existingLesson = db.prepare(`
                SELECT *
                FROM user_schedule
                WHERE id = ?
                AND user_id = ?
            `).get(
                lessonId,
                req.user.id
            );


            if (!existingLesson) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Dars topilmadi yoki bu dars sizga tegishli emas."
                });

            }


            const {
                day,
                start_time,
                end_time,
                subject,
                teacher,
                room,
                lesson_type
            } = req.body;


            if (
                !day ||
                !start_time ||
                !end_time ||
                !subject
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Kun, boshlanish vaqti, tugash vaqti va fan nomini kiriting."
                });

            }


            if (!allowedDays.includes(day)) {

                return res.status(400).json({
                    success: false,
                    message: "Hafta kuni noto‘g‘ri."
                });

            }


            if (end_time <= start_time) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Tugash vaqti boshlanish vaqtidan keyin bo‘lishi kerak."
                });

            }


            // Yangilash

            db.prepare(`
                UPDATE user_schedule
                SET
                    day = ?,
                    start_time = ?,
                    end_time = ?,
                    subject = ?,
                    teacher = ?,
                    room = ?,
                    lesson_type = ?
                WHERE id = ?
                AND user_id = ?
            `).run(
                day,
                start_time,
                end_time,
                subject.trim(),
                teacher ? teacher.trim() : "",
                room ? room.trim() : "",
                lesson_type ? lesson_type.trim() : "",
                lessonId,
                req.user.id
            );


            const updatedLesson = db.prepare(`
                SELECT
                    id,
                    day,
                    start_time,
                    end_time,
                    subject,
                    teacher,
                    room,
                    lesson_type,
                    created_at
                FROM user_schedule
                WHERE id = ?
                AND user_id = ?
            `).get(
                lessonId,
                req.user.id
            );


            return res.status(200).json({
                success: true,
                message: "Dars muvaffaqiyatli yangilandi.",
                lesson: updatedLesson
            });

        } catch (error) {

            console.error(
                "Darsni tahrirlash xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Darsni tahrirlashda xatolik yuz berdi."
            });

        }

    }
);


// ==================================================
// DARSNI O'CHIRISH
// DELETE /api/schedule/:id
// ==================================================

router.delete(
    "/:id",
    authenticateToken,
    function (req, res) {

        try {

            const lessonId = Number(
                req.params.id
            );


            if (
                !Number.isInteger(lessonId) ||
                lessonId <= 0
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Dars ID noto‘g‘ri."
                });

            }


            // Dars aynan shu userga tegishlimi?

            const lesson = db.prepare(`
                SELECT *
                FROM user_schedule
                WHERE id = ?
                AND user_id = ?
            `).get(
                lessonId,
                req.user.id
            );


            if (!lesson) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Dars topilmadi yoki bu dars sizga tegishli emas."
                });

            }


            db.prepare(`
                DELETE FROM user_schedule
                WHERE id = ?
                AND user_id = ?
            `).run(
                lessonId,
                req.user.id
            );


            return res.status(200).json({
                success: true,
                message: "Dars jadvaldan o‘chirildi."
            });

        } catch (error) {

            console.error(
                "Darsni o‘chirish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Darsni o‘chirishda xatolik yuz berdi."
            });

        }

    }
);


module.exports = router;