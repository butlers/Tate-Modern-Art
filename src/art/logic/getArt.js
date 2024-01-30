const pool = require('../db');

async function getArt() {
    try {
        const data = await pool.query('SELECT * FROM art');
        return data.rows;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { getArt }