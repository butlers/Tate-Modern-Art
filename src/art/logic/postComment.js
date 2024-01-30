const pool = require('../db');

async function postComment(req) {
    const artId = req.params.id;
    const { userID, name, content } = req.body;

    try {
        if (!content) {
            throw new Error('Content is required');
        }

        let userVerification = true;

        if (!userID && name) {
            const existingComment = await pool.query(`
                SELECT id
                FROM comments
                WHERE art_id = $1 AND name = $2 AND user_id IS NULL
            `, [artId, name]);

            if (existingComment.rows.length > 0) {
                userVerification = false;
                throw new Error('User with the same name has already left a comment');
            }
        }

        const commentResult = await pool.query(`
            INSERT INTO comments (art_id, user_id, name, content)
            VALUES ($1, $2, $3, $4)
            RETURNING id, user_id, name, content;
        `, [artId, userID, name, content]);

        const newComment = commentResult.rows[0];

        const updateResult = await pool.query(`
            UPDATE art
            SET comments = comments || $1::JSONB
            WHERE id = $2
            RETURNING *;
        `, [{ id: newComment.id, name, content, userID }, artId]);

        const updatedArt = updateResult.rows[0];

        return updatedArt;
    } catch (err) {
        throw err; // Bubble up the error
    }
}

module.exports = { postComment };
