const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("./database");

const router = express.Router();

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "student_hub_secret_key_2026";


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

    const parts = authHeader.split(" ");

    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {
        return res.status(401).json({
            success: false,
            message: "Token formati noto‘g‘ri."
        });
    }

    const token = parts[1];

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
            message:
                "Token yaroqsiz yoki muddati tugagan."
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
// SHAXSIY JADVALNI OLISH
// GET /api/schedule
// ==================================================

router.get(
    "/",
    authenticateToken,

    async function (req, res) {

        try {

            const result = await db.query(
                `
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

                WHERE user_id = $1

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
                `,
                [req.user.id]
            );

            return res.status(200).json({
                success: true,
                schedule: result.rows
            });

        } catch (error) {

            console.error(
                "Jadvalni olish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Jadvalni olishda xatolik yuz berdi."
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

    async function (req, res) {

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
                    message:
                        "Hafta kuni noto‘g‘ri."
                });
            }


            if (end_time <= start_time) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Tugash vaqti boshlanish vaqtidan keyin bo‘lishi kerak."
                });
            }


            const result = await db.query(
                `
                INSERT INTO user_schedule
                (
                    user_id,
                    day,
                    start_time,
                    end_time,
                    subject,
                    teacher,
                    room,
                    lesson_type
                )

                VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7,
                    $8
                )

                RETURNING
                    id,
                    day,
                    start_time,
                    end_time,
                    subject,
                    teacher,
                    room,
                    lesson_type,
                    created_at
                `,
                [
                    req.user.id,
                    day,
                    start_time,
                    end_time,
                    subject.trim(),
                    teacher
                        ? teacher.trim()
                        : "",
                    room
                        ? room.trim()
                        : "",
                    lesson_type
                        ? lesson_type.trim()
                        : ""
                ]
            );


            return res.status(201).json({
                success: true,
                message:
                    "Dars jadvalga qo‘shildi.",
                lesson:
                    result.rows[0]
            });

        } catch (error) {

            console.error(
                "Dars qo‘shish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Darsni qo‘shishda xatolik yuz berdi."
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

    async function (req, res) {

        try {

            const lessonId =
                Number(req.params.id);


            if (
                !Number.isInteger(lessonId) ||
                lessonId <= 0
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Dars ID noto‘g‘ri."
                });
            }


            const existingResult =
                await db.query(
                    `
                    SELECT id
                    FROM user_schedule
                    WHERE id = $1
                    AND user_id = $2
                    `,
                    [
                        lessonId,
                        req.user.id
                    ]
                );


            if (
                existingResult.rows.length === 0
            ) {

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
                    message:
                        "Hafta kuni noto‘g‘ri."
                });
            }


            if (end_time <= start_time) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Tugash vaqti boshlanish vaqtidan keyin bo‘lishi kerak."
                });
            }


            const result = await db.query(
                `
                UPDATE user_schedule

                SET
                    day = $1,
                    start_time = $2,
                    end_time = $3,
                    subject = $4,
                    teacher = $5,
                    room = $6,
                    lesson_type = $7

                WHERE id = $8
                AND user_id = $9

                RETURNING
                    id,
                    day,
                    start_time,
                    end_time,
                    subject,
                    teacher,
                    room,
                    lesson_type,
                    created_at
                `,
                [
                    day,
                    start_time,
                    end_time,
                    subject.trim(),
                    teacher
                        ? teacher.trim()
                        : "",
                    room
                        ? room.trim()
                        : "",
                    lesson_type
                        ? lesson_type.trim()
                        : "",
                    lessonId,
                    req.user.id
                ]
            );


            return res.status(200).json({
                success: true,
                message:
                    "Dars muvaffaqiyatli yangilandi.",
                lesson:
                    result.rows[0]
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

    async function (req, res) {

        try {

            const lessonId =
                Number(req.params.id);


            if (
                !Number.isInteger(lessonId) ||
                lessonId <= 0
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Dars ID noto‘g‘ri."
                });
            }


            const result = await db.query(
                `
                DELETE FROM user_schedule

                WHERE id = $1
                AND user_id = $2

                RETURNING
                    id,
                    day,
                    subject
                `,
                [
                    lessonId,
                    req.user.id
                ]
            );


            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Dars topilmadi yoki bu dars sizga tegishli emas."
                });
            }


            return res.status(200).json({
                success: true,
                message:
                    "Dars jadvaldan o‘chirildi."
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