const pool = require('./db');
const importData = require('./importData');

async function setupTables() {
    try {
        // Create art Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS art (
                id SERIAL PRIMARY KEY,
                artist VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                year INTEGER,
                comments JSONB DEFAULT '[]'::JSONB
            );
        `);

        // Create comments Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                art_id INTEGER REFERENCES art(id) ON DELETE CASCADE,
                user_id VARCHAR(255),
                name VARCHAR(255) NOT NULL,
                content VARCHAR(255) NOT NULL
            );
        `);

        // Create users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                age INTEGER NOT NULL,
                location VARCHAR(255) NOT NULL
            );
        `);
    } catch (err) {
        console.error(err);
    }
}

async function initializeDatabase() {
    try {
        await importData();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
}

module.exports = { setupTables, initializeDatabase };
