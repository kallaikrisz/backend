const db = require('../config/db');

class Orszag {
  // Összes ország lekérése
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM orszagok');
      return rows;
    } catch (err) {
      throw err; // hibát a controller kezeli
    }
  }

  // Régió alapján szűrés
  static async getByRegion(regio) {
    try {
      const [rows] = await db.query('SELECT * FROM orszagok WHERE regio = ?', [regio]);
      return rows;
    } catch (err) {
      throw err;
    }
  }
    // Id alapján szűrés
  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM orszagok WHERE id = ?', [id]);
      return rows;
    } catch (err) {
      throw err;
    }
  }
    // Több szűrési feltétellel
  static async filter({ regio, kodReszlet }) {
    let sql = 'SELECT * FROM orszagok WHERE 1=1';
    const params = [];

    if (regio) {
      sql += ' AND regio = ?';
      params.push(regio);
    }

    if (kodReszlet) {
      sql += ' AND kod LIKE ?';
      params.push(`%${kodReszlet}%`);
    }

    const [rows] = await db.query(sql, params);
    return rows;
  }

}
//Keresés név vagy részlet alapján
//Rendezett vagy lapozott lekérés
//Speciális statisztikai lekérések

module.exports = Orszag;

