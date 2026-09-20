const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const db = require("./database");

const router = express.Router();

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "student_hub_secret_key_2026";


// ==================================================
// UPLOADS PAPKASI
// ==================================================

const uploadsFolder =
    path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder, {
        recursive: true
    });
}


// ==================================================
// MULTER STORAGE
// ==================================================

const storage = multer.diskStorage({

    destination: function (
        req,
        file,
        callback
    ) {
        callback(null, uploadsFolder);
    },

    filename: function (
        req,
        file,
        callback
    ) {

        const extension =
            path.extname(file.originalname);

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(
                Math.random() * 1000000000
            ) +
            extension;

        callback(null, uniqueName);
    }
});


const allowedExtensions = [
    ".pdf",
    ".docx",
    ".pptx",
    ".txt"
];


const materialUpload = multer({

    storage: storage,

    limits: {
        fileSize: 20 * 1024 * 1024
    },

    fileFilter: function (
        req,
        file,
        callback
    ) {

        const extension =
            path
                .extname(file.originalname)
                .toLowerCase();

        if (
            !allowedExtensions.includes(
                extension
            )
        ) {
            return callback(
                new Error(
                    "Faqat PDF, DOCX, PPTX yoki TXT fayl yuklash mumkin."
                )
            );
        }

        callback(null, true);
    }
});


// ==================================================
// JWT TEKSHIRISH
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
                "Avval tizimga kiring."
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
                "Token yaroqsiz yoki muddati tugagan."
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
        !req.user ||
        req.user.role !== "admin"
    ) {

        return res.status(403).json({
            success: false,
            message:
                "Bu amal faqat admin uchun."
        });
    }

    next();
}


// ==================================================
// BARCHA MATERIALLARNI OLISH
// GET /api/materials
// ==================================================

router.get(
    "/",

    async function (req, res) {

        try {

            const result =
                await db.query(`
                    SELECT
                        id,
                        title,
                        subject,
                        description,
                        file_name,
                        file_path,
                        file_type,
                        content,
                        created_at

                    FROM materials

                    ORDER BY id DESC
                `);

            return res.json({
                success: true,
                materials:
                    result.rows
            });

        } catch (error) {

            console.error(
                "Materiallarni olish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Materiallarni yuklab bo‘lmadi."
            });
        }
    }
);


// ==================================================
// BITTA MATERIALNI OLISH
// GET /api/materials/:id
// ==================================================

router.get(
    "/:id",

    async function (req, res) {

        try {

            const id =
                Number(req.params.id);

            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Material ID noto‘g‘ri."
                });
            }

            const result =
                await db.query(
                    `
                    SELECT
                        id,
                        title,
                        subject,
                        description,
                        file_name,
                        file_path,
                        file_type,
                        content,
                        created_at

                    FROM materials

                    WHERE id = $1
                    `,
                    [id]
                );

            const material =
                result.rows[0];

            if (!material) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Material topilmadi."
                });
            }

            return res.json({
                success: true,
                material:
                    material
            });

        } catch (error) {

            console.error(
                "Materialni olish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Materialni yuklab bo‘lmadi."
            });
        }
    }
);


// ==================================================
// YANGI MATERIAL QO'SHISH
// POST /api/materials
// ADMIN
// ==================================================

router.post(
    "/",

    authenticateToken,
    requireAdmin,

    function (
        req,
        res,
        next
    ) {

        materialUpload.single("file")(
            req,
            res,

            function (error) {

                if (error) {
                    return next(error);
                }

                next();
            }
        );
    },

    async function (req, res) {

        try {

            const title =
                String(
                    req.body.title || ""
                ).trim();

            const subject =
                String(
                    req.body.subject || ""
                ).trim();

            const description =
                String(
                    req.body.description || ""
                ).trim();


            if (
                !title ||
                !subject
            ) {

                if (
                    req.file &&
                    fs.existsSync(
                        req.file.path
                    )
                ) {
                    fs.unlinkSync(
                        req.file.path
                    );
                }

                return res.status(400).json({
                    success: false,
                    message:
                        "Material nomi va fan nomini kiriting."
                });
            }


            if (!req.file) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Material faylini tanlang."
                });
            }


            const extension =
                path
                    .extname(
                        req.file.originalname
                    )
                    .toLowerCase();

            const relativeFilePath =
                "/uploads/" +
                req.file.filename;


            const result =
                await db.query(
                    `
                    INSERT INTO materials
                    (
                        title,
                        subject,
                        description,
                        file_name,
                        file_path,
                        file_type,
                        content
                    )

                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        NULL
                    )

                    RETURNING *
                    `,
                    [
                        title,
                        subject,
                        description,
                        req.file.originalname,
                        relativeFilePath,
                        extension
                    ]
                );


            return res.status(201).json({
                success: true,
                message:
                    "Material muvaffaqiyatli qo‘shildi.",
                material:
                    result.rows[0]
            });

        } catch (error) {

            console.error(
                "Material qo‘shish xatosi:",
                error
            );


            if (
                req.file &&
                fs.existsSync(
                    req.file.path
                )
            ) {

                try {

                    fs.unlinkSync(
                        req.file.path
                    );

                } catch (deleteError) {

                    console.error(
                        "Faylni tozalash xatosi:",
                        deleteError
                    );
                }
            }


            return res.status(500).json({
                success: false,
                message:
                    "Materialni qo‘shib bo‘lmadi."
            });
        }
    }
);


// ==================================================
// MATERIALNI O'CHIRISH
// DELETE /api/materials/:id
// ADMIN
// ==================================================

router.delete(
    "/:id",

    authenticateToken,
    requireAdmin,

    async function (req, res) {

        try {

            const id =
                Number(req.params.id);


            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Material ID noto‘g‘ri."
                });
            }


            const findResult =
                await db.query(
                    `
                    SELECT *
                    FROM materials
                    WHERE id = $1
                    `,
                    [id]
                );

            const material =
                findResult.rows[0];


            if (!material) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Material topilmadi."
                });
            }


            await db.query(
                `
                DELETE FROM materials
                WHERE id = $1
                `,
                [id]
            );


            const isInternal =
                material.file_type ===
                    ".internal" ||
                material.file_path ===
                    "internal";


            if (
                !isInternal &&
                material.file_path
            ) {

                const savedFileName =
                    path.basename(
                        material.file_path
                    );

                const fullFilePath =
                    path.join(
                        uploadsFolder,
                        savedFileName
                    );


                if (
                    fs.existsSync(
                        fullFilePath
                    )
                ) {

                    fs.unlinkSync(
                        fullFilePath
                    );
                }
            }


            return res.json({
                success: true,
                message:
                    "Material o‘chirildi."
            });

        } catch (error) {

            console.error(
                "Materialni o‘chirish xatosi:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Materialni o‘chirib bo‘lmadi."
            });
        }
    }
);


// ==================================================
// MULTER ERROR
// ==================================================

router.use(
    function (
        error,
        req,
        res,
        next
    ) {

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
                        "Fayl hajmi 20 MB dan oshmasligi kerak."
                });
            }

            return res.status(400).json({
                success: false,
                message:
                    error.message
            });
        }


        if (error) {

            return res.status(400).json({
                success: false,
                message:
                    error.message ||
                    "Fayl yuklashda xatolik."
            });
        }


        next();
    }
);


module.exports = router;