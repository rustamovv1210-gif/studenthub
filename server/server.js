// ==================================================
// STUDENT HUB BACKEND
// SERVER.JS
// POSTGRESQL VERSION
// 1-QISM
// ==================================================

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mammoth = require("mammoth");
const path = require("path");

const db = require("./database");
const materialsRoutes = require("./materials-routes");
const scheduleRoutes = require("./schedule-routes");

const app = express();

const PORT =
    process.env.PORT || 3000;

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "student_hub_secret_key_2026";


// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());

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


// ==================================================
// DOCX UPLOAD
// ==================================================

const upload = multer({

    storage:
        multer.memoryStorage(),

    limits: {
        fileSize:
            10 * 1024 * 1024
    },

    fileFilter: function (
        req,
        file,
        callback
    ) {

        const fileName =
            file.originalname
                .toLowerCase();

        if (
            !fileName.endsWith(".docx")
        ) {

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
// SERVER TEST
// ==================================================

app.get(
    "/",
    function (req, res) {

        res.send(
            "Student Hub server ishlayapti! 🚀"
        );
    }
);


// ==================================================
// TOKEN TEKSHIRISH
// ==================================================

function authenticateToken(
    req,
    res,
    next
) {

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

    const token = parts[1];

    try {

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (error) {

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

function requireAdmin(
    req,
    res,
    next
) {

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

            const existingResult =
                await db.query(
                    `
                    SELECT id
                    FROM users
                    WHERE email = $1
                    `,
                    [email]
                );


            if (
                existingResult.rows.length > 0
            ) {

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
                await db.query(
                    `
                    INSERT INTO users
                    (
                        name,
                        email,
                        password,
                        role
                    )

                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4
                    )

                    RETURNING
                        id,
                        name,
                        email,
                        role
                    `,
                    [
                        name,
                        email,
                        hashedPassword,
                        "student"
                    ]
                );


            return res.status(201).json({
                success: true,
                message:
                    "Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi.",
                user:
                    result.rows[0]
            });

        } catch (error) {

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

            const userResult =
                await db.query(
                    `
                    SELECT
                        id,
                        name,
                        email,
                        password,
                        role

                    FROM users

                    WHERE email = $1
                    `,
                    [email]
                );

            const user =
                userResult.rows[0];


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


            // ==========================================
            // PRODUCTION ADMIN
            // ==========================================

            const adminEmail =
                process.env.ADMIN_EMAIL
                    ?.trim()
                    .toLowerCase();


            if (
                adminEmail &&
                user.email.toLowerCase() ===
                    adminEmail &&
                user.role !== "admin"
            ) {

                await db.query(
                    `
                    UPDATE users
                    SET role = 'admin'
                    WHERE id = $1
                    `,
                    [user.id]
                );

                user.role = "admin";
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

        } catch (error) {

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

    async function (req, res) {

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

            const userResult =
                await db.query(
                    `
                    SELECT id
                    FROM users
                    WHERE id = $1
                    `,
                    [id]
                );


            if (
                userResult.rows.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Foydalanuvchi topilmadi."
                });
            }


            const emailOwnerResult =
                await db.query(
                    `
                    SELECT id
                    FROM users

                    WHERE
                        email = $1
                        AND id != $2
                    `,
                    [
                        email,
                        id
                    ]
                );


            if (
                emailOwnerResult.rows.length > 0
            ) {

                return res.status(409).json({
                    success: false,
                    message:
                        "Bu email boshqa foydalanuvchiga tegishli."
                });
            }


            const updatedResult =
                await db.query(
                    `
                    UPDATE users

                    SET
                        name = $1,
                        email = $2

                    WHERE id = $3

                    RETURNING
                        id,
                        name,
                        email,
                        role
                    `,
                    [
                        name,
                        email,
                        id
                    ]
                );


            return res.status(200).json({
                success: true,
                message:
                    "Profil muvaffaqiyatli yangilandi.",
                user:
                    updatedResult.rows[0]
            });

        } catch (error) {

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

    async function (req, res) {

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
                await db.query(
                    `
                    INSERT INTO test_results
                    (
                        user_id,
                        subject,
                        score,
                        total
                    )

                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4
                    )

                    RETURNING
                        id,
                        subject,
                        score,
                        total,
                        created_at
                    `,
                    [
                        userId,
                        subject,
                        score,
                        total
                    ]
                );


            return res.status(201).json({
                success: true,
                message:
                    "Test natijasi saqlandi.",
                result:
                    result.rows[0]
            });

        } catch (error) {

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

    async function (req, res) {

        const userId =
            req.user.id;

        try {

            const result =
                await db.query(
                    `
                    SELECT
                        id,
                        subject,
                        score,
                        total,
                        created_at

                    FROM test_results

                    WHERE user_id = $1

                    ORDER BY id DESC
                    `,
                    [userId]
                );


            return res.status(200).json({
                success: true,
                results:
                    result.rows
            });

        } catch (error) {

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
// ADMIN CHECK
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

    async function (req, res) {

        try {

            const result =
                await db.query(`
                    SELECT
                        id,
                        name,
                        email,
                        role,
                        created_at

                    FROM users

                    ORDER BY id DESC
                `);


            return res.status(200).json({
                success: true,
                users:
                    result.rows
            });

        } catch (error) {

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

    async function (req, res) {

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


        if (
            userId === req.user.id
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "O‘z accountingiz rolini o‘zgartira olmaysiz."
            });
        }


        try {

            const result =
                await db.query(
                    `
                    UPDATE users

                    SET role = $1

                    WHERE id = $2

                    RETURNING
                        id,
                        name,
                        email,
                        role,
                        created_at
                    `,
                    [
                        newRole,
                        userId
                    ]
                );


            if (
                result.rows.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Foydalanuvchi topilmadi."
                });
            }


            return res.status(200).json({
                success: true,
                message:
                    "Foydalanuvchi roli muvaffaqiyatli o‘zgartirildi.",
                user:
                    result.rows[0]
            });

        } catch (error) {

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
// ADMIN - USER DELETE
// ==================================================

app.delete(
    "/api/admin/users/:id",

    authenticateToken,
    requireAdmin,

    async function (req, res) {

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


        if (
            userId === req.user.id
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "O‘z accountingizni o‘chira olmaysiz."
            });
        }


        try {

            const result =
                await db.query(
                    `
                    DELETE FROM users

                    WHERE id = $1

                    RETURNING
                        id,
                        name,
                        email,
                        role
                    `,
                    [userId]
                );


            if (
                result.rows.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Foydalanuvchi topilmadi."
                });
            }


            const deletedUser =
                result.rows[0];


            return res.status(200).json({
                success: true,
                message:
                    "Foydalanuvchi muvaffaqiyatli o‘chirildi.",
                user: {
                    id:
                        deletedUser.id,
                    name:
                        deletedUser.name,
                    email:
                        deletedUser.email
                }
            });

        } catch (error) {

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
// 1-QISM TUGADI
// 2-QISMNI BEVOSITA SHU YERDAN DAVOM ETTIRAMIZ
// ==================================================
// ==================================================
// STUDENT HUB BACKEND
// SERVER.JS
// POSTGRESQL VERSION
// 2-QISM
// ==================================================


// ==================================================
// ADMIN - BARCHA SAVOLLARNI OLISH
// GET /api/admin/questions
// ==================================================

app.get(
    "/api/admin/questions",

    authenticateToken,
    requireAdmin,

    async function (req, res) {

        try {

            const result =
                await db.query(`
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
                `);


            return res.status(200).json({
                success: true,
                questions:
                    result.rows
            });

        } catch (error) {

            console.error(
                "Admin questions xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Savollarni olib bo‘lmadi."
            });
        }
    }
);


// ==================================================
// ADMIN - YANGI SAVOL QO'SHISH
// POST /api/admin/questions
// ==================================================

app.post(
    "/api/admin/questions",

    authenticateToken,
    requireAdmin,

    async function (req, res) {

        const subject =
            String(
                req.body.subject || ""
            ).trim();

        const question =
            String(
                req.body.question || ""
            ).trim();

        const optionA =
            String(
                req.body.option_a || ""
            ).trim();

        const optionB =
            String(
                req.body.option_b || ""
            ).trim();

        const optionC =
            String(
                req.body.option_c || ""
            ).trim();

        const optionD =
            String(
                req.body.option_d || ""
            ).trim();

        const correctAnswer =
            String(
                req.body.correct_answer || ""
            )
                .trim()
                .toUpperCase();


        if (
            !subject ||
            !question ||
            !optionA ||
            !optionB ||
            !optionC ||
            !optionD ||
            !correctAnswer
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Barcha savol ma'lumotlarini kiriting."
            });
        }


        if (
            !["A", "B", "C", "D"]
                .includes(correctAnswer)
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "To‘g‘ri javob A, B, C yoki D bo‘lishi kerak."
            });
        }


        try {

            const result =
                await db.query(
                    `
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

                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7
                    )

                    RETURNING *
                    `,
                    [
                        subject,
                        question,
                        optionA,
                        optionB,
                        optionC,
                        optionD,
                        correctAnswer
                    ]
                );


            return res.status(201).json({
                success: true,
                message:
                    "Savol muvaffaqiyatli qo‘shildi.",
                question:
                    result.rows[0]
            });

        } catch (error) {

            console.error(
                "Savol qo‘shish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Savolni qo‘shib bo‘lmadi."
            });
        }
    }
);


// ==================================================
// ADMIN - SAVOLNI TAHRIRLASH
// PUT /api/admin/questions/:id
// ==================================================

app.put(
    "/api/admin/questions/:id",

    authenticateToken,
    requireAdmin,

    async function (req, res) {

        const questionId =
            Number(req.params.id);


        if (
            !Number.isInteger(questionId) ||
            questionId <= 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Savol ID noto‘g‘ri."
            });
        }


        const subject =
            String(
                req.body.subject || ""
            ).trim();

        const question =
            String(
                req.body.question || ""
            ).trim();

        const optionA =
            String(
                req.body.option_a || ""
            ).trim();

        const optionB =
            String(
                req.body.option_b || ""
            ).trim();

        const optionC =
            String(
                req.body.option_c || ""
            ).trim();

        const optionD =
            String(
                req.body.option_d || ""
            ).trim();

        const correctAnswer =
            String(
                req.body.correct_answer || ""
            )
                .trim()
                .toUpperCase();


        if (
            !subject ||
            !question ||
            !optionA ||
            !optionB ||
            !optionC ||
            !optionD ||
            !correctAnswer
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Barcha savol ma'lumotlarini kiriting."
            });
        }


        if (
            !["A", "B", "C", "D"]
                .includes(correctAnswer)
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "To‘g‘ri javob A, B, C yoki D bo‘lishi kerak."
            });
        }


        try {

            const result =
                await db.query(
                    `
                    UPDATE questions

                    SET
                        subject = $1,
                        question = $2,
                        option_a = $3,
                        option_b = $4,
                        option_c = $5,
                        option_d = $6,
                        correct_answer = $7

                    WHERE id = $8

                    RETURNING *
                    `,
                    [
                        subject,
                        question,
                        optionA,
                        optionB,
                        optionC,
                        optionD,
                        correctAnswer,
                        questionId
                    ]
                );


            if (
                result.rows.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Savol topilmadi."
                });
            }


            return res.status(200).json({
                success: true,
                message:
                    "Savol muvaffaqiyatli yangilandi.",
                question:
                    result.rows[0]
            });

        } catch (error) {

            console.error(
                "Savol update xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Savolni yangilab bo‘lmadi."
            });
        }
    }
);


// ==================================================
// ADMIN - SAVOLNI O'CHIRISH
// DELETE /api/admin/questions/:id
// ==================================================

app.delete(
    "/api/admin/questions/:id",

    authenticateToken,
    requireAdmin,

    async function (req, res) {

        const questionId =
            Number(req.params.id);


        if (
            !Number.isInteger(questionId) ||
            questionId <= 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Savol ID noto‘g‘ri."
            });
        }


        try {

            const result =
                await db.query(
                    `
                    DELETE FROM questions

                    WHERE id = $1

                    RETURNING
                        id,
                        subject,
                        question
                    `,
                    [questionId]
                );


            if (
                result.rows.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Savol topilmadi."
                });
            }


            return res.status(200).json({
                success: true,
                message:
                    "Savol muvaffaqiyatli o‘chirildi."
            });

        } catch (error) {

            console.error(
                "Savol delete xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Savolni o‘chirib bo‘lmadi."
            });
        }
    }
);


// ==================================================
// STUDENT - TEST SAVOLLARI
// GET /api/questions
//
// Hozir frontend bilan moslik uchun correct_answer ham
// yuborilmoqda. Keyin test tekshiruvini server tomonga
// ko'chirib, correct_answer ni browserdan yashiramiz.
// ==================================================

app.get(
    "/api/questions",

    async function (req, res) {

        try {

            const subject =
                String(
                    req.query.subject || ""
                ).trim();


            let result;


            if (subject) {

                result =
                    await db.query(
                        `
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

                        WHERE subject = $1

                        ORDER BY id ASC
                        `,
                        [subject]
                    );

            } else {

                result =
                    await db.query(`
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
                    `);
            }


            return res.status(200).json({
                success: true,
                questions:
                    result.rows
            });

        } catch (error) {

            console.error(
                "Questions xatosi:",
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
// SELF-STUDY DOCX IMPORT
// POST /api/self-study/docx
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


            const result =
                await mammoth.extractRawText({
                    buffer:
                        req.file.buffer
                });


            const text =
                String(
                    result.value || ""
                ).trim();


            if (!text) {

                return res.status(400).json({
                    success: false,
                    message:
                        "DOCX faylda matn topilmadi."
                });
            }


            return res.status(200).json({
                success: true,
                message:
                    "DOCX muvaffaqiyatli o‘qildi.",
                text:
                    text
            });

        } catch (error) {

            console.error(
                "DOCX import xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "DOCX faylni o‘qib bo‘lmadi."
            });
        }
    }
);


// ==================================================
// 404
// ==================================================

app.use(
    function (req, res) {

        return res.status(404).json({
            success: false,
            message:
                "API manzili topilmadi."
        });
    }
);


// ==================================================
// GLOBAL ERROR HANDLER
// ==================================================

app.use(
    function (
        error,
        req,
        res,
        next
    ) {

        console.error(
            "Server error:",
            error
        );


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
                        "Fayl hajmi juda katta."
                });
            }
        }


        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Serverda xatolik yuz berdi."
        });
    }
);


// ==================================================
// DATABASE + SERVER START
// ==================================================

async function startServer() {

    try {

        await db.initDatabase();

        app.listen(
            PORT,

            function () {

                console.log(
                    "===================================="
                );

                console.log(
                    `Student Hub server ${PORT}-portda ishlayapti! 🚀`
                );

                console.log(
                    "PostgreSQL tayyor! 🐘"
                );

                console.log(
                    "===================================="
                );
            }
        );

    } catch (error) {

        console.error(
            "Serverni ishga tushirish xatosi:",
            error
        );

        process.exit(1);
    }
}


startServer();