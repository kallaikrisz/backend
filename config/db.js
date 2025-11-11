require('dotenv').config();
const mysql = require('mysql2');

// Admin kapcsolat
const adminPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN_USER,
  password: process.env.DB_ADMIN_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Vásárlói kapcsolat
const userPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_USER,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

module.exports = { adminPool, userPool };

