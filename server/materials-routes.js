// ==================================================
// STUDENT HUB
// MATERIALS ROUTES
// ==================================================

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const db = require("./database");

const router = express.Router();


// ==================================================
// JWT SECRET
// ==================================================

const JWT_SECRET =
    "student_hub_secret_key_2026";


// ==================================================
// UPLOADS PAPKASI
// ==================================================

const uploadsFolder =
    path.join(__dirname, "uploads");


if (!fs.existsSync(uploadsFolder)) {

    fs.mkdirSync(
        uploadsFolder,
        {
            recursive: true
        }
    );

}


// ==================================================
// MULTER STORAGE
// ==================================================

const storage =
    multer.diskStorage({

        destination:
            function (
                req,
                file,
                callback
            ) {

                callback(
                    null,
                    uploadsFolder
                );

            },


        filename:
            function (
                req,
                file,
                callback
            ) {

                const extension =
                    path.extname(
                        file.originalname
                    );


                const uniqueName =
                    Date.now() +
                    "-" +
                    Math.round(
                        Math.random() *
                        1000000000
                    ) +
                    extension;


                callback(
                    null,
                    uniqueName
                );

            }

    });


// ==================================================
// RUXSAT ETILGAN FILE TURLARI
// ==================================================

const allowedExtensions = [

    ".pdf",
    ".docx",
    ".pptx",
    ".txt"

];


const materialUpload =
    multer({

        storage: storage,

        limits: {

            fileSize:
                20 * 1024 * 1024

        },


        fileFilter:
            function (
                req,
                file,
                callback
            ) {

                const extension =
                    path
                        .extname(
                            file.originalname
                        )
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


                callback(
                    null,
                    true
                );

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


    const token =
        authHeader &&
        authHeader.split(" ")[1];


    if (!token) {

        return res
            .status(401)
            .json({

                success: false,

                message:
                    "Avval tizimga kiring."

            });

    }


    jwt.verify(
        token,
        JWT_SECRET,

        function (
            error,
            user
        ) {

            if (error) {

                return res
                    .status(403)
                    .json({

                        success: false,

                        message:
                            "Token yaroqsiz yoki muddati tugagan."

                    });

            }


            req.user =
                user;


            next();

        }
    );

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

        return res
            .status(403)
            .json({

                success: false,

                message:
                    "Bu amal faqat admin uchun."

            });

    }


    next();

}


// ==================================================
// 1. BARCHA MATERIALLARNI OLISH
// PUBLIC
//
// MUHIM:
// content HAM FRONTENDGA YUBORILADI
// ==================================================

router.get(
    "/",

    function (
        req,
        res
    ) {

        try {

            const materials =
                db.prepare(`
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

                    ORDER BY
                        id DESC
                `).all();


            return res.json({

                success: true,

                materials:
                    materials

            });

        }

        catch (error) {

            console.error(
                "Materiallarni olish xatosi:",
                error
            );


            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        "Materiallarni yuklab bo‘lmadi."

                });

        }

    }
);


// ==================================================
// 2. BITTA MATERIALNI ID BO'YICHA OLISH
// PUBLIC
// ==================================================

router.get(
    "/:id",

    function (
        req,
        res
    ) {

        try {

            const id =
                Number(
                    req.params.id
                );


            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Material ID noto‘g‘ri."

                    });

            }


            const material =
                db.prepare(`
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

                    WHERE id = ?
                `).get(id);


            if (!material) {

                return res
                    .status(404)
                    .json({

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

        }

        catch (error) {

            console.error(
                "Materialni olish xatosi:",
                error
            );


            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        "Materialni yuklab bo‘lmadi."

                });

        }

    }
);


// ==================================================
// 3. YANGI MATERIAL QO'SHISH
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


    function (
        req,
        res
    ) {

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


            // ==========================================
            // TEKSHIRISH
            // ==========================================

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


                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Material nomi va fan nomini kiriting."

                    });

            }


            if (!req.file) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Material faylini tanlang."

                    });

            }


            // ==========================================
            // DATABASE
            // ==========================================

            const extension =
                path
                    .extname(
                        req.file.originalname
                    )
                    .toLowerCase();


            const relativeFilePath =
                "/uploads/" +
                req.file.filename;


            const insert =
                db.prepare(`
                    INSERT INTO materials (
                        title,
                        subject,
                        description,
                        file_name,
                        file_path,
                        file_type,
                        content
                    )

                    VALUES (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        NULL
                    )
                `);


            const result =
                insert.run(

                    title,

                    subject,

                    description,

                    req.file.originalname,

                    relativeFilePath,

                    extension

                );


            const material =
                db.prepare(`
                    SELECT *
                    FROM materials
                    WHERE id = ?
                `).get(
                    result.lastInsertRowid
                );


            return res
                .status(201)
                .json({

                    success: true,

                    message:
                        "Material muvaffaqiyatli qo‘shildi.",

                    material:
                        material

                });

        }

        catch (error) {

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

                }

                catch (
                    deleteError
                ) {

                    console.error(
                        "Faylni tozalash xatosi:",
                        deleteError
                    );

                }

            }


            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        "Materialni qo‘shib bo‘lmadi."

                });

        }

    }
);
// ==================================================
// 4. MATERIALNI O'CHIRISH
// ADMIN
// ==================================================

router.delete(
    "/:id",

    authenticateToken,

    requireAdmin,

    function (
        req,
        res
    ) {

        try {

            const id =
                Number(
                    req.params.id
                );


            // ==========================================
            // ID TEKSHIRISH
            // ==========================================

            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Material ID noto‘g‘ri."

                    });

            }


            // ==========================================
            // MATERIALNI TOPISH
            // ==========================================

            const material =
                db.prepare(`
                    SELECT *
                    FROM materials
                    WHERE id = ?
                `).get(id);


            if (!material) {

                return res
                    .status(404)
                    .json({

                        success: false,

                        message:
                            "Material topilmadi."

                    });

            }


            // ==========================================
            // DATABASEDAN O'CHIRISH
            // ==========================================

            db.prepare(`
                DELETE FROM materials
                WHERE id = ?
            `).run(id);


            // ==========================================
            // FAQAT HAQIQIY FAYL BO'LSA
            // SERVERDAN HAM O'CHIRISH
            // ==========================================

            const isInternal =
                material.file_type === ".internal" ||
                material.file_path === "internal";


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


            // ==========================================
            // JAVOB
            // ==========================================

            return res.json({

                success: true,

                message:
                    "Material o‘chirildi."

            });

        }

        catch (error) {

            console.error(
                "Materialni o‘chirish xatosi:",
                error
            );


            return res
                .status(500)
                .json({

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

        // ==========================================
        // MULTER XATOSI
        // ==========================================

        if (
            error instanceof
            multer.MulterError
        ) {

            if (
                error.code ===
                "LIMIT_FILE_SIZE"
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Fayl hajmi 20 MB dan oshmasligi kerak."

                    });

            }


            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }


        // ==========================================
        // BOSHQA XATOLAR
        // ==========================================

        if (error) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        error.message ||
                        "Fayl yuklashda xatolik."

                });

        }


        next();

    }
);


// ==================================================
// EXPORT
// ==================================================

module.exports = router;