const express = require('express');
const pool = require('./db');
const fs = require('fs');
const port = 3000;

const app = express();

const importData = require('./importData');

app.use(express.json());


app.get('/setup-tables', async (req, res) => {
    try {
        // Create art Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS art (
                id SERIAL PRIMARY KEY,
                artist VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                year INTEGER
            );
        `);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/initialize-database', async (req, res) => {
    try {
      await importData();
      res.status(200).send({ message: 'Art Database initialized successfully.' });
    } catch (error) {
      console.error('Error initializing database:', error);
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




app.listen(port, () => console.log(`Server has started on port: ${port}`))