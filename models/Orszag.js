const db = require('../config/db');

class Orszag {
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM orszagok');
      return rows;
    } catch (err) {
      throw err; // hibát a controller fogja kezelni
    }
  }
}

module.exports = Orszag;
