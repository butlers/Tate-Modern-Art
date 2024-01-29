const fs = require('fs');
const { Pool } = require('pg');
const csv = require('fast-csv');

const pool = new Pool({
  user: 'user123',
  host: 'db',
  database: 'db123',
  password: 'password123',
  port: 5432,
});

const importData = async () => {
  try {
    const stream = fs.createReadStream('./the-tate-collection.csv');

    const csvStream = csv.parse({ headers: true, delimiter: ';' })
      .on('data', async (record) => {
        csvStream.pause();

        let id = record.id || null;
        let artist = record.artist || null;
        let title = record.title || null;
        let year = record.year || null;

        try {
          await pool.query("INSERT INTO art(id, artist, title, year) VALUES ($1, $2, $3, $4)", [id, artist, title, year]);
        } catch (error) {
          console.error('Error inserting data into the database:', error);
        }

        csvStream.resume();
      })
      .on('end', () => {
        console.log('CSV parsing finished.');
        pool.end();
      })
      .on('error', (error) => {
        console.error('Error parsing CSV:', error);
      });

    stream.pipe(csvStream);
  } catch (err) {
    console.error('Error importing data:', err);
  }
};

module.exports = importData;
