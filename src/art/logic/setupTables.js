const pool = require('../db');

async function setupTables() {
    try {
        // Create art Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS art (
                id SERIAL PRIMARY KEY,
                artist VARCHAR(500) NOT NULL,
                title VARCHAR(500) NOT NULL,
                year INTEGER,
                comments JSONB DEFAULT '[]'::JSONB
            );
        `);

        // Create comments Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                art_id INTEGER REFERENCES art(id) ON DELETE CASCADE,
                user_id VARCHAR(500),
                name VARCHAR(500) NOT NULL,
                content VARCHAR(500) NOT NULL
            );
        `);

        // Create users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(500) NOT NULL,
                age INTEGER NOT NULL,
                location VARCHAR(500) NOT NULL
            );
        `);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { setupTables };
