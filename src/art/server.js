const express = require('express');
const pool = require('./db');
const fs = require('fs');
const port = 3000;

const app = express();

const { setupTables, initializeDatabase } = require ('./setup');

app.use(express.json());


app.get('/setup-tables', async (req, res) => {
    try {
        await setupTables();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/initialize-database', async (req, res) => {
    try {
        await initializeDatabase();
        res.status(200).send({ message: 'Art Database initialized successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/api/art', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM art');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
});


app.get('/api/art/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM art WHERE id = $1', [id]);

        if (result.rows.length > 0) {
            res.status(200).send(result.rows[0]);
        } else {
            res.status(404).send('Art entry not found');
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, age, location } = req.body;

        if (!name || !age || !location) {
            return res.status(400).json({ error: 'Name, age, and location are required.' });
        }

        const result = await pool.query('INSERT INTO users (name, age, location) VALUES ($1, $2, $3) RETURNING *', [name, age, location]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating new user:', error);
        res.sendStatus(500);
    }
});

app.post('/api/art/:id/comments', async (req, res) => {
    const artId = req.params.id;
    const { userID, name, content } = req.body;

    try {
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        let userVerification = true; // Assume user verification is successful by default

        if (!userID && name) {
            // If userID is not provided, verify that a user with the same name hasn't already left a comment
            const existingComment = await pool.query(`
                SELECT id
                FROM comments
                WHERE art_id = $1 AND name = $2 AND user_id IS NULL
            `, [artId, name]);

            if (existingComment.rows.length > 0) {
                // User with the same name has already left a comment for this art entry
                userVerification = false;
            }
        }

        if (!userVerification) {
            return res.status(400).json({ error: 'User with the same name has already left a comment' });
        }

        // Insert comment into the comments table
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

        res.status(201).json(updatedArt);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


app.listen(port, () => console.log(`Server has started on port: ${port}`))