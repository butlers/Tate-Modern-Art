const pool = require('../db');
const {setupTables} = require('../logic/setupTables');
const {initializeDatabase} = require('../logic/initializeDatabase');

async function setupTablesHandler(req, res) {
    try {
        await setupTables();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function initializeDatabaseHandler(res, res) {
    try {
        await initializeDatabase();
        res.sendStatus(200);
      } catch (error) {
        console.error('Error initializing database:', error);
        res.sendStatus(500);
      }
}

module.exports = { setupTablesHandler, initializeDatabaseHandler };
