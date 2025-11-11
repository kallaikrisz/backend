//const db = require('../config/db');
const { adminPool } = require('../config/db');

class Orszag {
  // Összes ország lekérése
  static async getAll() {
    try {
      const [rows] = await adminPool.query('SELECT * FROM orszagok');
      return rows;
    } catch (err) {
      throw err; // hibát a controller kezeli
    }
  }

  // Régió alapján szűrés
  static async getByRegion(regio) {
    try {
      const [rows] = await adminPool.query('SELECT * FROM orszagok WHERE regio = ?', [regio]);
      return rows;
    } catch (err) {
      throw err;
    }
  }
    // Id alapján szűrés
  static async getById(id) {
    try {
      const [rows] = await adminPool.query('SELECT * FROM orszagok WHERE id = ?', [id]);
      return rows;
    } catch (err) {
      throw err;
    }
  }
    // Több szűrési feltétellel
  static async filterOrszagok({ regio, kodReszlet }) {
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

    const [rows] = await adminPool.query(sql, params);
    return rows;
  }
  // Lapozott és rendezett lekérés
static async getPagedOrszagok({ page = 1, limit = 10, sortBy = 'id', order = 'asc' }) {
  const offset = (page - 1) * limit;

  // Engedélyezett rendezési oszlopok, hogy ne lehessen SQL injection
  const validSortFields = ['id', 'nev', 'kod', 'regio'];
  const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
  const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const sql = `
    SELECT * FROM orszagok
    ORDER BY ${sortField} ${sortOrder}
    LIMIT ? OFFSET ?
  `;
  const [rows] = await adminPool.query(sql, [Number(limit), Number(offset)]);

  // Összes rekord megszámolása, hogy vissza lehessen adni a lapozás információit
  const [countRows] = await adminPool.query('SELECT COUNT(*) AS total FROM orszagok');
  const total = countRows[0].total;

  return {
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / limit),
    data: rows
  };
}


}
//Keresés név vagy részlet alapján
//Rendezett vagy lapozott lekérés
//Speciális statisztikai lekérések

module.exports = Orszag;

