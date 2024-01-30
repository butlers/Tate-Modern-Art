const pool = require('../db');

async function createUser(req, res) {
    try {
        const { name, age, location } = req.body;

        if (!name || !age || !location) {
            console.error('Failed to create user due to missing fields');
            return;
        }

        const result = await pool.query('INSERT INTO users (name, age, location) VALUES ($1, $2, $3) RETURNING *', [name, age, location]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating new user:', error);
    }
}

module.exports = { createUser };
