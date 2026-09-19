const db = require("./database");

const users = db.prepare(`
    SELECT
        id,
        name,
        email,
        role,
        created_at
    FROM users
    ORDER BY id ASC
`).all();

console.log("\n==============================");
console.log("STUDENT HUB FOYDALANUVCHILARI");
console.log("==============================\n");

if (users.length === 0) {

    console.log("Database ichida foydalanuvchi yo'q.");

} else {

    users.forEach(function (user) {

        console.log("ID:", user.id);
        console.log("Ism:", user.name);
        console.log("Email:", user.email);
        console.log("Role:", user.role);
        console.log("------------------------------");

    });

}