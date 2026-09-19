const Database = require("better-sqlite3");

const db = new Database("studenthub.db");


// ==================================================
// DATABASE SETTINGS
// ==================================================

db.pragma("foreign_keys = ON");


// ==================================================
// USERS
// ==================================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'student',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();


// ==================================================
// TEST RESULTS
// ==================================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        subject TEXT NOT NULL,
        score INTEGER NOT NULL,
        total INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
    )
`).run();


// ==================================================
// QUESTIONS
// ==================================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        question TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();


// ==================================================
// MATERIALS
// ==================================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS materials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subject TEXT NOT NULL,
        description TEXT,

        file_name TEXT,
        file_path TEXT,
        file_type TEXT,

        content TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();


// ==================================================
// ESKI DATABASE UCHUN MIGRATION
// ==================================================
// Agar materials jadvali oldindan mavjud bo'lsa,
// yangi "content" ustunini avtomatik qo'shamiz.
// Eski materiallar o'chmaydi.
// ==================================================

const materialColumns =
    db.prepare(`
        PRAGMA table_info(materials)
    `).all();


const hasContentColumn =
    materialColumns.some(
        function (column) {

            return column.name === "content";
        }
    );


if (!hasContentColumn) {

    db.prepare(`
        ALTER TABLE materials
        ADD COLUMN content TEXT
    `).run();

    console.log(
        "Materials jadvaliga content ustuni qo‘shildi! 📝"
    );
}


// ==================================================
// USER SCHEDULE
// ==================================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS user_schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,

        day TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,

        subject TEXT NOT NULL,

        teacher TEXT,
        room TEXT,
        lesson_type TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
    )
`).run();


// ==================================================
// INDEXES
// ==================================================

db.prepare(`
    CREATE INDEX IF NOT EXISTS
    idx_user_schedule_user_id
    ON user_schedule(user_id)
`).run();


db.prepare(`
    CREATE INDEX IF NOT EXISTS
    idx_materials_subject
    ON materials(subject)
`).run();


db.prepare(`
    CREATE INDEX IF NOT EXISTS
    idx_questions_subject
    ON questions(subject)
`).run();


db.prepare(`
    CREATE INDEX IF NOT EXISTS
    idx_test_results_user_id
    ON test_results(user_id)
`).run();


// ==================================================
// READY
// ==================================================

console.log(
    "Student Hub database ulandi! 🗄️"
);

console.log(
    "Materials jadvali tayyor! 📚"
);

console.log(
    "Ichki dars materiallari tizimi tayyor! 📝"
);

console.log(
    "Shaxsiy dars jadvali tayyor! 📅"
);


module.exports = db;