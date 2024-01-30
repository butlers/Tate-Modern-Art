const pool = require('../db');

async function getArtById(req, res) {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM art WHERE id = $1', [id]);

        if (result.rows.length > 0) {
            return(result.rows[0]);
        } else {
            return;
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = { getArtById }




    