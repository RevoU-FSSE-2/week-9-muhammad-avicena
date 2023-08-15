import mysql from "mysql2/promise"; 
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10, // Adjust the connection limit as needed
});

// A function to get a connection from the pool
async function getConnectionFromPool() {
  const connection = await pool.getConnection();
  return connection;
}

export { getConnectionFromPool };