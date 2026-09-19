// ==================================================
// STUDENT HUB BACKEND
// SERVER.JS
// 1-QISM
// ==================================================

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mammoth = require("mammoth");
const path = require("path");
const fs = require("fs");

const db = require("./database");
const materialsRoutes = require("./materials-routes");
const scheduleRoutes = require("./schedule-routes");

const app = express();

const PORT = process.env.PORT || 3000;


// ==================================================
// JWT SECRET
// ==================================================

const JWT_SECRET =
    process.env.JWT_SECRET || "student_hub_secret_key_2026";


// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());

// JSON ma'lumotlarni route'lardan OLDIN o'qish
app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.use(
    "/api/materials",
    materialsRoutes
);

app.use(
    "/api/schedule",
    scheduleRoutes
);

app.use(express.json());


// ==================================================
// DOCX UPLOAD SOZLAMASI
// ==================================================

const upload = multer({

    storage: multer.memoryStorage(),

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: function (req, file, callback) {

        const fileName =
            file.originalname.toLowerCase();

        if (!fileName.endsWith(".docx")) {

            return callback(
                new Error(
                    "Faqat .docx fayl yuklash mumkin."
                )
            );
        }

        callback(null, true);
    }
});


// ==================================================
// TEST ROUTE
// ==================================================

app.get("/", function (req, res) {

    res.send(
        "Student Hub server ishlayapti! 🚀"
    );

});


// ==================================================
// TOKEN TEKSHIRISH
// ==================================================

function authenticateToken(req, res, next) {

    const authHeader =
        req.headers.authorization;


    if (!authHeader) {

        return res.status(401).json({

            success: false,

            message:
                "Avval hisobingizga kiring."

        });
    }


    const parts =
        authHeader.split(" ");


    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {

        return res.status(401).json({

            success: false,

            message:
                "Token formati noto‘g‘ri."

        });
    }


    const token =
        parts[1];


    try {

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );


        req.user =
            decoded;


        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message:
                "Login muddati tugagan. Qayta kiring."

        });
    }
}


// ==================================================
// ADMIN TEKSHIRISH
// ==================================================

function requireAdmin(req, res, next) {

    if (
        req.user.role !== "admin"
    ) {

        return res.status(403).json({

            success: false,

            message:
                "Bu bo‘lim faqat administrator uchun."

        });
    }


    next();
}


// ==================================================
// REGISTER
// ==================================================

app.post(
    "/api/register",

    async function (req, res) {

        const name =
            req.body.name?.trim();

        const email =
            req.body.email
                ?.trim()
                .toLowerCase();

        const password =
            req.body.password;


        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Barcha ma'lumotlarni kiriting."

            });
        }


        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email manzilini to‘g‘ri kiriting."

            });
        }


        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Parol kamida 6 ta belgidan iborat bo‘lishi kerak."

            });
        }


        try {

            const existingUser =
                db.prepare(`
                    SELECT id
                    FROM users
                    WHERE email = ?
                `).get(email);


            if (existingUser) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Bu email bilan foydalanuvchi mavjud."

                });
            }


            const hashedPassword =
                await bcrypt.hash(
                    password,
                    12
                );


            const result =
                db.prepare(`
                    INSERT INTO users
                    (
                        name,
                        email,
                        password,
                        role
                    )

                    VALUES (?, ?, ?, ?)
                `).run(
                    name,
                    email,
                    hashedPassword,
                    "student"
                );


            const newUser = {

                id:
                    Number(
                        result.lastInsertRowid
                    ),

                name:
                    name,

                email:
                    email,

                role:
                    "student"

            };


            return res.status(201).json({

                success: true,

                message:
                    "Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi.",

                user:
                    newUser

            });

        }

        catch (error) {

            console.error(
                "Register xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Serverda xatolik yuz berdi."

            });
        }
    }
);


// ==================================================
// LOGIN
// ==================================================

app.post(
    "/api/login",

    async function (req, res) {

        const email =
            req.body.email
                ?.trim()
                .toLowerCase();

        const password =
            req.body.password;


        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email va parolni kiriting."

            });
        }


        try {

            const user =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        password,
                        role

                    FROM users

                    WHERE email = ?
                `).get(email);


            if (!user) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Email yoki parol noto‘g‘ri."

                });
            }


            const passwordCorrect =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordCorrect) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Email yoki parol noto‘g‘ri."

                });
            }


            const token =
                jwt.sign(
                    {
                        id:
                            user.id,

                        role:
                            user.role
                    },

                    JWT_SECRET,

                    {
                        expiresIn:
                            "24h"
                    }
                );


            const safeUser = {

                id:
                    user.id,

                name:
                    user.name,

                email:
                    user.email,

                role:
                    user.role

            };


            return res.status(200).json({

                success: true,

                message:
                    "Login muvaffaqiyatli.",

                token:
                    token,

                user:
                    safeUser

            });

        }

        catch (error) {

            console.error(
                "Login xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Serverda xatolik yuz berdi."

            });
        }
    }
);


// ==================================================
// PROFILE UPDATE
// ==================================================

app.put(
    "/api/profile",

    authenticateToken,

    function (req, res) {

        const id =
            req.user.id;

        const name =
            req.body.name?.trim();

        const email =
            req.body.email
                ?.trim()
                .toLowerCase();


        if (
            !name ||
            !email
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Ism va emailni kiriting."

            });
        }


        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email manzilini to‘g‘ri kiriting."

            });
        }


        try {

            const user =
                db.prepare(`
                    SELECT id
                    FROM users
                    WHERE id = ?
                `).get(id);


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Foydalanuvchi topilmadi."

                });
            }


            const emailOwner =
                db.prepare(`
                    SELECT id
                    FROM users

                    WHERE
                        email = ?
                        AND id != ?
                `).get(
                    email,
                    id
                );


            if (emailOwner) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Bu email boshqa foydalanuvchiga tegishli."

                });
            }


            db.prepare(`
                UPDATE users

                SET
                    name = ?,
                    email = ?

                WHERE id = ?
            `).run(
                name,
                email,
                id
            );


            const updatedUser =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        role

                    FROM users

                    WHERE id = ?
                `).get(id);


            return res.status(200).json({

                success: true,

                message:
                    "Profil muvaffaqiyatli yangilandi.",

                user:
                    updatedUser

            });

        }

        catch (error) {

            console.error(
                "Profile xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Serverda xatolik yuz berdi."

            });
        }
    }
);


// ==================================================
// TEST NATIJASINI SAQLASH
// ==================================================

app.post(
    "/api/results",

    authenticateToken,

    function (req, res) {

        const userId =
            req.user.id;

        const subject =
            req.body.subject?.trim();

        const score =
            Number(req.body.score);

        const total =
            Number(req.body.total);


        if (
            !subject ||
            !Number.isInteger(score) ||
            !Number.isInteger(total)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Test natijasi noto‘g‘ri."

            });
        }


        if (
            total <= 0 ||
            score < 0 ||
            score > total
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Ball noto‘g‘ri kiritilgan."

            });
        }


        try {

            const result =
                db.prepare(`
                    INSERT INTO test_results
                    (
                        user_id,
                        subject,
                        score,
                        total
                    )

                    VALUES (?, ?, ?, ?)
                `).run(
                    userId,
                    subject,
                    score,
                    total
                );


            const savedResult =
                db.prepare(`
                    SELECT
                        id,
                        subject,
                        score,
                        total,
                        created_at

                    FROM test_results

                    WHERE id = ?
                `).get(
                    Number(
                        result.lastInsertRowid
                    )
                );


            return res.status(201).json({

                success: true,

                message:
                    "Test natijasi saqlandi.",

                result:
                    savedResult

            });

        }

        catch (error) {

            console.error(
                "Natijani saqlash xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Natijani saqlab bo‘lmadi."

            });
        }
    }
);


// ==================================================
// USER TEST NATIJALARINI OLISH
// ==================================================

app.get(
    "/api/results",

    authenticateToken,

    function (req, res) {

        const userId =
            req.user.id;


        try {

            const results =
                db.prepare(`
                    SELECT
                        id,
                        subject,
                        score,
                        total,
                        created_at

                    FROM test_results

                    WHERE user_id = ?

                    ORDER BY id DESC
                `).all(userId);


            return res.status(200).json({

                success: true,

                results:
                    results

            });

        }

        catch (error) {

            console.error(
                "Natijalarni olish xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Natijalarni olib bo‘lmadi."

            });
        }
    }
);


// ==================================================
// ADMIN CHECK API
// ==================================================

app.get(
    "/api/admin",

    authenticateToken,
    requireAdmin,

    function (req, res) {

        return res.json({

            success: true,

            message:
                "Admin Panelga ruxsat berildi."

        });
    }
);


// ==================================================
// ADMIN - USERS
// ==================================================

app.get(
    "/api/admin/users",

    authenticateToken,
    requireAdmin,

    function (req, res) {

        try {

            const users =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        role,
                        created_at

                    FROM users

                    ORDER BY id DESC
                `).all();


            return res.status(200).json({

                success: true,

                users:
                    users

            });

        }

        catch (error) {

            console.error(
                "Admin users xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Foydalanuvchilarni olib bo‘lmadi."

            });
        }
    }
);


// ==================================================
// ADMIN - USER ROLE
// ==================================================

app.put(
    "/api/admin/users/:id/role",

    authenticateToken,
    requireAdmin,

    function (req, res) {

        const userId =
            Number(req.params.id);

        const newRole =
            req.body.role;


        if (
            !Number.isInteger(userId) ||
            userId <= 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Foydalanuvchi ID noto‘g‘ri."

            });
        }


        if (
            newRole !== "admin" &&
            newRole !== "student"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Role noto‘g‘ri."

            });
        }


        if (userId === req.user.id) {

            return res.status(400).json({

                success: false,

                message:
                    "O‘z accountingiz rolini o‘zgartira olmaysiz."

            });
        }


        try {

            const user =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        role

                    FROM users

                    WHERE id = ?
                `).get(userId);


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Foydalanuvchi topilmadi."

                });
            }


            db.prepare(`
                UPDATE users

                SET role = ?

                WHERE id = ?
            `).run(
                newRole,
                userId
            );


            const updatedUser =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        role,
                        created_at

                    FROM users

                    WHERE id = ?
                `).get(userId);


            return res.status(200).json({

                success: true,

                message:
                    "Foydalanuvchi roli muvaffaqiyatli o‘zgartirildi.",

                user:
                    updatedUser

            });

        }

        catch (error) {

            console.error(
                "Role update xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:

                                    "Rolni o‘zgartirib bo‘lmadi."

            });
        }
    }
);
// ==================================================
// SERVER.JS
// 2-QISM
// ==================================================


// ==================================================
// ADMIN - FOYDALANUVCHINI O'CHIRISH
// ==================================================

app.delete(
    "/api/admin/users/:id",

    authenticateToken,
    requireAdmin,

    function (req, res) {

        const userId =
            Number(req.params.id);


        if (
            !Number.isInteger(userId) ||
            userId <= 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Foydalanuvchi ID noto‘g‘ri."
            });
        }


        // Admin o'z accountini o'chira olmaydi
        if (userId === req.user.id) {

            return res.status(400).json({
                success: false,
                message:
                    "O‘z accountingizni o‘chira olmaysiz."
            });
        }


        try {

            const user =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        role

                    FROM users

                    WHERE id = ?
                `).get(userId);


            if (!user) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Foydalanuvchi topilmadi."
                });
            }


            db.prepare(`
                DELETE FROM users
                WHERE id = ?
            `).run(userId);


            return res.status(200).json({

                success: true,

                message:
                    "Foydalanuvchi muvaffaqiyatli o‘chirildi.",

                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

            });

        }

        catch (error) {

            console.error(
                "User delete xatosi:",
                error
            );


            return res.status(500).json({
                success: false,
                message:
                    "Foydalanuvchini o‘chirib bo‘lmadi."
            });
        }
    }
);


// ==================================================
// ADMIN - BARCHA TEST SAVOLLARINI OLISH
// ==================================================

app.get(
    "/api/admin/questions",

    authenticateToken,
    requireAdmin,

    function (req, res) {

        try {

            const questions =
                db.prepare(`
                    SELECT
                        id,
                        subject,
                        question,
                        option_a,
                        option_b,
                        option_c,
                        option_d,
                        correct_answer,
                        created_at

                    FROM questions

                    ORDER BY id DESC
                `).all();


            return res.status(200).json({

                success: true,

                questions:
                    questions

            });

        }

        catch (error) {

            console.error(
                "Questions GET xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Test savollarini olib bo‘lmadi."

            });
        }
    }
);


// ==================================================
// ADMIN - YANGI TEST SAVOLI QO'SHISH
// ==================================================

app.post(
    "/api/admin/questions",

    authenticateToken,
    requireAdmin,

    function (req, res) {

        const {
            subject,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer
        } = req.body;


        if (
            !subject ||
            !question ||
            !option_a ||
            !option_b ||
            !option_c ||
            !option_d ||
            !correct_answer
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Barcha maydonlarni to‘ldiring."

            });
        }


        const answer =
            String(correct_answer)
                .trim()
                .toUpperCase();


        if (
            !["A", "B", "C", "D"]
                .includes(answer)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "To‘g‘ri javob A, B, C yoki D bo‘lishi kerak."

            });
        }


        try {

            const result =
                db.prepare(`
                    INSERT INTO questions
                    (
                        subject,
                        question,
                        option_a,
                        option_b,
                        option_c,
                        option_d,
                        correct_answer
                    )

                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `).run(
                    String(subject).trim(),
                    String(question).trim(),
                    String(option_a).trim(),
                    String(option_b).trim(),
                    String(option_c).trim(),
                    String(option_d).trim(),
                    answer
                );


            const newQuestion =
                db.prepare(`
                    SELECT *
                    FROM questions
                    WHERE id = ?
                `).get(
                    result.lastInsertRowid
                );


            return res.status(201).json({

                success: true,

                message:
                    "Test savoli qo‘shildi.",

                question:
                    newQuestion

            });

        }

        catch (error) {

            console.error(
                "Question POST xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Test savolini qo‘shib bo‘lmadi."

            });
        }
    }
);


// ==================================================
// ADMIN - TEST SAVOLINI TAHRIRLASH
// ==================================================

app.put(
    "/api/admin/questions/:id",

    authenticateToken,
    requireAdmin,

    function (req, res) {

        const questionId =
            Number(req.params.id);


        if (
            !Number.isInteger(questionId) ||
            questionId <= 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Test ID noto‘g‘ri."

            });
        }


        const {
            subject,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer
        } = req.body;


        if (
            !subject ||
            !question ||
            !option_a ||
            !option_b ||
            !option_c ||
            !option_d ||
            !correct_answer
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Barcha maydonlarni to‘ldiring."

            });
        }


        const answer =
            String(correct_answer)
                .trim()
                .toUpperCase();


        if (
            !["A", "B", "C", "D"]
                .includes(answer)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "To‘g‘ri javob A, B, C yoki D bo‘lishi kerak."

            });
        }


        try {

            const existingQuestion =
                db.prepare(`
                    SELECT id
                    FROM questions
                    WHERE id = ?
                `).get(questionId);


            if (!existingQuestion) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Test savoli topilmadi."

                });
            }


            db.prepare(`
                UPDATE questions

                SET
                    subject = ?,
                    question = ?,
                    option_a = ?,
                    option_b = ?,
                    option_c = ?,
                    option_d = ?,
                    correct_answer = ?

                WHERE id = ?
            `).run(
                String(subject).trim(),
                String(question).trim(),
                String(option_a).trim(),
                String(option_b).trim(),
                String(option_c).trim(),
                String(option_d).trim(),
                answer,
                questionId
            );


            const updatedQuestion =
                db.prepare(`
                    SELECT *
                    FROM questions
                    WHERE id = ?
                `).get(questionId);


            return res.status(200).json({

                success: true,

                message:
                    "Test savoli yangilandi.",

                question:
                    updatedQuestion

            });

        }

        catch (error) {

            console.error(
                "Question PUT xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Test savolini yangilab bo‘lmadi."

            });
        }
    }
);


// ==================================================
// ADMIN - TEST SAVOLINI O'CHIRISH
// ==================================================

app.delete(
    "/api/admin/questions/:id",

    authenticateToken,
    requireAdmin,

    function (req, res) {

        const questionId =
            Number(req.params.id);


        if (
            !Number.isInteger(questionId) ||
            questionId <= 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Test ID noto‘g‘ri."

            });
        }


        try {

            const question =
                db.prepare(`
                    SELECT
                        id,
                        subject,
                        question

                    FROM questions

                    WHERE id = ?
                `).get(questionId);


            if (!question) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Test savoli topilmadi."

                });
            }


            db.prepare(`
                DELETE FROM questions
                WHERE id = ?
            `).run(questionId);


            return res.status(200).json({

                success: true,

                message:
                    "Test savoli o‘chirildi.",

                question:
                    question

            });

        }

        catch (error) {

            console.error(
                "Question DELETE xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Test savolini o‘chirib bo‘lmadi."

            });
        }
    }
);


// ==================================================
// PUBLIC / STUDENT - TEST SAVOLLARINI OLISH
// ==================================================

app.get(
    "/api/questions",

    function (req, res) {

        try {

            const questions =
                db.prepare(`
                    SELECT
                        id,
                        subject,
                        question,
                        option_a,
                        option_b,
                        option_c,
                        option_d,
                        correct_answer

                    FROM questions

                    ORDER BY id ASC
                `).all();


            return res.status(200).json({

                success: true,

                questions:
                    questions

            });

        }

        catch (error) {

            console.error(
                "Questions GET xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Test savollarini olib bo‘lmadi."

            });
        }
    }
);


// ==================================================
// MUSTAQIL TAYYORGARLIK - DOCX IMPORT
// ==================================================

app.post(
    "/api/self-study/docx",

    upload.single("file"),

    async function (req, res) {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "DOCX fayl tanlanmagan."

                });
            }


            // Word faylni xotiradan o'qiymiz
            const result =
                await mammoth.extractRawText({

                    buffer:
                        req.file.buffer

                });


            const text =
                result.value
                    ? result.value.trim()
                    : "";


            if (!text) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Word fayldan matn topilmadi."

                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "DOCX fayl muvaffaqiyatli o‘qildi.",

                fileName:
                    req.file.originalname,

                text:
                    text

            });

        }

        catch (error) {

            console.error(
                "DOCX o‘qish xatosi:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Word faylni o‘qib bo‘lmadi."

            });
        }
    }
);


// ==================================================
// MULTER / DOCX XATOLARI
// ==================================================

app.use(
    function (error, req, res, next) {

        if (
            error instanceof
            multer.MulterError
        ) {

            if (
                error.code ===
                "LIMIT_FILE_SIZE"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "DOCX fayl hajmi 10 MB dan oshmasligi kerak."

                });
            }


            return res.status(400).json({

                success: false,

                message:
                    "Fayl yuklashda xatolik yuz berdi."

            });
        }


        if (
            error &&
            error.message ===
                "Faqat .docx fayl yuklash mumkin."
        ) {

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });
        }


        console.error(
            "Server xatosi:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Serverda kutilmagan xatolik yuz berdi."

        });
    }
);


// ==================================================
// SERVER
// ==================================================

app.listen(
    PORT,

    function () {

        console.log(
            "Student Hub server ishga tushdi! 🚀"
        );

        console.log(
            "http://localhost:" + PORT
        );

    }
);