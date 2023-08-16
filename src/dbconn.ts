import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

export const getConnectionDb = async () => {
  const connection = await pool.getConnection();
  return connection;
};

export const getListTransactionsDb = async () => {
  const connection = await getConnectionDb();

  try {
    const [rows] = await connection.query(`SELECT * FROM transaction`);
    console.log("List transaction :", rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.release();
  }
};

export const getListUsersDb = async () => {
  const connection = await getConnectionDb();

  try {
    const [rows] = await connection.query(`SELECT * FROM users`);
    console.log("List user :", rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.release();
  }
};

export const getUsersByIdDb = async (user_id: number) => {
  const connection = await getConnectionDb();

  try {
    const [result]: any = await connection.query(
      `SELECT * FROM users WHERE user_id = ?`,
      [user_id]
    );
    console.log("Get user by ID :", result);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    connection.release();
  }
};
