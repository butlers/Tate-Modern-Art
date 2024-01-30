const pool = require('../db');

async function getArt(page = 1, entriesPerPage = 10) {
    try {
        const offset = (page - 1) * entriesPerPage;
        const data = await pool.query('SELECT * FROM art LIMIT $1 OFFSET $2', [entriesPerPage, offset]);
        return data.rows;
    } catch (err) {
        console.error(err);
        throw err; 
    }
}

module.exports = { getArt };
