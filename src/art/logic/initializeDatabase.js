const importData = require('./importData');

async function initializeDatabase() {
    try {
        await importData();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
}

module.exports = { initializeDatabase };
