import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

export const pool2 = mysql.createPool(`${process.env.DB_RAILWAY_URL}`);

export const getConnectionDb = async () => {
  const connection = await pool2.getConnection();
  return connection;
};