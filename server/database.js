// ==================================================
// STUDENT HUB
// DATABASE.JS
//
// LOCAL  -> SQLite
// RENDER -> PostgreSQL
// ==================================================

const usePostgres =
    Boolean(process.env.DATABASE_URL);

let pool = null;
let sqlite = null;


// ==================================================
// POSTGRESQL
// ==================================================

if (usePostgres) {

    const { Pool } = require("pg");

    pool = new Pool({
        connectionString:
            process.env.DATABASE_URL,

        ssl:
            process.env.NODE_ENV === "production"
                ? {
                    rejectUnauthorized: false
                }
                : false
    });


    pool.on("connect", function () {

        console.log(
            "PostgreSQL ulandi! 🐘"
        );
    });


    pool.on("error", function (error) {

        console.error(
            "PostgreSQL pool xatosi:",
            error.message
        );
    });

}


// ==================================================
// SQLITE
// ==================================================

else {

    const Database =
        require("better-sqlite3");

    sqlite =
        new Database("studenthub.db");


    sqlite.pragma(
        "foreign_keys = ON"
    );


    console.log(
        "SQLite ulandi! 💾"
    );
}


// ==================================================
// POSTGRESQL QUERY -> SQLITE QUERY
//
// $1, $2, $3...
// SQLite uchun ? ga aylantiriladi.
// ==================================================

function convertToSqlite(sql) {

    return sql.replace(
        /\$\d+/g,
        "?"
    );
}


// ==================================================
// UNIVERSAL QUERY
// ==================================================

async function query(
    text,
    params = []
) {

    // ==============================================
    // POSTGRESQL
    // ==============================================

    if (usePostgres) {

        return pool.query(
            text,
            params
        );
    }


    // ==============================================
    // SQLITE
    // ==============================================

    const sqliteSql =
        convertToSqlite(text);

    const statement =
        sqlite.prepare(sqliteSql);


    const returnsRows =
        /^\s*(SELECT|WITH|PRAGMA)/i
            .test(sqliteSql) ||
        /\bRETURNING\b/i
            .test(sqliteSql);


    if (returnsRows) {

        const rows =
            statement.all(
                ...params
            );

        return {
            rows: rows,
            rowCount: rows.length
        };
    }


    const result =
        statement.run(
            ...params
        );


    return {
        rows: [],
        rowCount:
            result.changes,

        lastInsertRowid:
            Number(
                result.lastInsertRowid
            )
    };
}


// ==================================================
// POSTGRESQL TABLES
// ==================================================

async function initPostgres() {

    const client =
        await pool.connect();


    try {

        await client.query("BEGIN");


        // ==========================================
        // USERS
        // ==========================================

        await client.query(`
            CREATE TABLE IF NOT EXISTS users
            (
                id SERIAL PRIMARY KEY,

                name TEXT NOT NULL,

                email TEXT
                    NOT NULL
                    UNIQUE,

                password TEXT NOT NULL,

                role TEXT
                    NOT NULL
                    DEFAULT 'student',

                created_at TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP
            )
        `);


        // ==========================================
        // TEST RESULTS
        // ==========================================

        await client.query(`
            CREATE TABLE IF NOT EXISTS test_results
            (
                id SERIAL PRIMARY KEY,

                user_id INTEGER NOT NULL,

                subject TEXT NOT NULL,

                score INTEGER NOT NULL,

                total INTEGER NOT NULL,

                created_at TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
            )
        `);


        // ==========================================
        // QUESTIONS
        // ==========================================

        await client.query(`
            CREATE TABLE IF NOT EXISTS questions
            (
                id SERIAL PRIMARY KEY,

                subject TEXT NOT NULL,

                question TEXT NOT NULL,

                option_a TEXT NOT NULL,

                option_b TEXT NOT NULL,

                option_c TEXT NOT NULL,

                option_d TEXT NOT NULL,

                correct_answer TEXT NOT NULL,

                created_at TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP
            )
        `);


        // ==========================================
        // MATERIALS
        // ==========================================

        await client.query(`
            CREATE TABLE IF NOT EXISTS materials
            (
                id SERIAL PRIMARY KEY,

                title TEXT NOT NULL,

                subject TEXT NOT NULL,

                description TEXT,

                file_name TEXT,

                file_path TEXT,

                file_type TEXT,

                content TEXT,

                created_at TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP
            )
        `);


        // ==========================================
        // USER SCHEDULE
        // ==========================================

        await client.query(`
            CREATE TABLE IF NOT EXISTS user_schedule
            (
                id SERIAL PRIMARY KEY,

                user_id INTEGER NOT NULL,

                day TEXT NOT NULL,

                start_time TEXT NOT NULL,

                end_time TEXT NOT NULL,

                subject TEXT NOT NULL,

                teacher TEXT,

                room TEXT,

                lesson_type TEXT,

                created_at TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
            )
        `);


        // ==========================================
        // INDEXES
        // ==========================================

        await client.query(`
            CREATE INDEX IF NOT EXISTS
            idx_test_results_user_id
            ON test_results(user_id)
        `);


        await client.query(`
            CREATE INDEX IF NOT EXISTS
            idx_questions_subject
            ON questions(subject)
        `);


        await client.query(`
            CREATE INDEX IF NOT EXISTS
            idx_materials_subject
            ON materials(subject)
        `);


        await client.query(`
            CREATE INDEX IF NOT EXISTS
            idx_user_schedule_user_id
            ON user_schedule(user_id)
        `);


        await client.query("COMMIT");


        console.log(
            "PostgreSQL jadvallari tayyor! 🐘"
        );

    } catch (error) {

        await client.query(
            "ROLLBACK"
        );

        throw error;

    } finally {

        client.release();
    }
}


// ==================================================
// SQLITE TABLES
// ==================================================

async function initSqlite() {

    sqlite.exec(`
        CREATE TABLE IF NOT EXISTS users
        (
            id INTEGER
                PRIMARY KEY
                AUTOINCREMENT,

            name TEXT NOT NULL,

            email TEXT
                NOT NULL
                UNIQUE,

            password TEXT NOT NULL,

            role TEXT
                NOT NULL
                DEFAULT 'student',

            created_at DATETIME
                DEFAULT CURRENT_TIMESTAMP
        );


        CREATE TABLE IF NOT EXISTS test_results
        (
            id INTEGER
                PRIMARY KEY
                AUTOINCREMENT,

            user_id INTEGER NOT NULL,

            subject TEXT NOT NULL,

            score INTEGER NOT NULL,

            total INTEGER NOT NULL,

            created_at DATETIME
                DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
        );


        CREATE TABLE IF NOT EXISTS questions
        (
            id INTEGER
                PRIMARY KEY
                AUTOINCREMENT,

            subject TEXT NOT NULL,

            question TEXT NOT NULL,

            option_a TEXT NOT NULL,

            option_b TEXT NOT NULL,

            option_c TEXT NOT NULL,

            option_d TEXT NOT NULL,

            correct_answer TEXT NOT NULL,

            created_at DATETIME
                DEFAULT CURRENT_TIMESTAMP
        );


        CREATE TABLE IF NOT EXISTS materials
        (
            id INTEGER
                PRIMARY KEY
                AUTOINCREMENT,

            title TEXT NOT NULL,

            subject TEXT NOT NULL,

            description TEXT,

            file_name TEXT,

            file_path TEXT,

            file_type TEXT,

            content TEXT,

            created_at DATETIME
                DEFAULT CURRENT_TIMESTAMP
        );


        CREATE TABLE IF NOT EXISTS user_schedule
        (
            id INTEGER
                PRIMARY KEY
                AUTOINCREMENT,

            user_id INTEGER NOT NULL,

            day TEXT NOT NULL,

            start_time TEXT NOT NULL,

            end_time TEXT NOT NULL,

            subject TEXT NOT NULL,

            teacher TEXT,

            room TEXT,

            lesson_type TEXT,

            created_at DATETIME
                DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
        );


        CREATE INDEX IF NOT EXISTS
        idx_test_results_user_id
        ON test_results(user_id);


        CREATE INDEX IF NOT EXISTS
        idx_questions_subject
        ON questions(subject);


        CREATE INDEX IF NOT EXISTS
        idx_materials_subject
        ON materials(subject);


        CREATE INDEX IF NOT EXISTS
        idx_user_schedule_user_id
        ON user_schedule(user_id);
    `);


    console.log(
        "SQLite jadvallari tayyor! 💾"
    );
}


// ==================================================
// DATABASE INITIALIZATION
// ==================================================

async function initDatabase() {

    if (usePostgres) {

        console.log(
            "Database rejimi: PostgreSQL 🐘"
        );

        await initPostgres();

    } else {

        console.log(
            "Database rejimi: SQLite 💾"
        );

        await initSqlite();
    }
}


// ==================================================
// EXPORT
// ==================================================

module.exports = {

    query,

    initDatabase,

    pool,

    sqlite,

    usePostgres
};