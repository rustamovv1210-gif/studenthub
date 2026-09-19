// ==========================================
// STUDENT HUB - MAKE ADMIN
// ==========================================

const db = require("./database");


// ==========================================
// ADMIN QILINADIGAN EMAIL
// ==========================================

const email =
    process.argv[2]
        ?.trim()
        .toLowerCase();


// ==========================================
// EMAIL BERILMAGAN
// ==========================================

if (!email) {

    console.log(
        "❌ Email kiriting."
    );

    console.log(
        "Misol:"
    );

    console.log(
        "node make-admin.js admin@gmail.com"
    );

    process.exit(1);

}


// ==========================================
// USERNI TOPISH
// ==========================================

const user =
    db.prepare(`
        SELECT
            id,
            name,
            email,
            role

        FROM users

        WHERE email = ?
    `).get(email);


// ==========================================
// USER TOPILMADI
// ==========================================

if (!user) {

    console.log(
        "❌ Bunday email bilan foydalanuvchi topilmadi:"
    );

    console.log(
        email
    );

    process.exit(1);

}


// ==========================================
// ALLAQACHON ADMIN
// ==========================================

if (user.role === "admin") {

    console.log(
        "ℹ️ Bu foydalanuvchi allaqachon admin:"
    );

    console.log(
        user.email
    );

    process.exit(0);

}


// ==========================================
// ADMIN QILISH
// ==========================================

db.prepare(`
    UPDATE users

    SET role = 'admin'

    WHERE id = ?
`).run(
    user.id
);


// ==========================================
// TEKSHIRISH
// ==========================================

const updatedUser =
    db.prepare(`
        SELECT
            id,
            name,
            email,
            role

        FROM users

        WHERE id = ?
    `).get(
        user.id
    );


console.log(
    "================================"
);

console.log(
    "✅ ADMIN MUVAFFAQIYATLI YARATILDI"
);

console.log(
    "================================"
);

console.log(
    "ID:",
    updatedUser.id
);

console.log(
    "Ism:",
    updatedUser.name
);

console.log(
    "Email:",
    updatedUser.email
);

console.log(
    "Role:",
    updatedUser.role
);

console.log(
    "================================"
);