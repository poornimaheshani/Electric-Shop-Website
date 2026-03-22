const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const tableStatements = [
  `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      stock INT NOT NULL DEFAULT 0,
      status VARCHAR(50) NOT NULL DEFAULT 'In Stock',
      image VARCHAR(255) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) DEFAULT NULL,
      email VARCHAR(255) DEFAULT NULL,
      phone VARCHAR(50) DEFAULT NULL,
      address TEXT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT DEFAULT NULL,
      total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      status VARCHAR(50) NOT NULL DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `,
];

async function verifyConnection() {
  const connection = await db.getConnection();
  connection.release();
  console.log('MySQL connected');
}

async function ensureTables() {
  for (const statement of tableStatements) {
    await db.query(statement);
  }
  console.log('Database tables are ready');
}

async function initializeDatabase() {
  try {
    await verifyConnection();
    await ensureTables();
  } catch (error) {
    console.error('Database initialization failed:', error.message);
  }
}

initializeDatabase();

module.exports = db;
