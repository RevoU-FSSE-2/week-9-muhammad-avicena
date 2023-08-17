import { getConnectionDb } from "./dbConnectionPool";

// User database connection
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
    console.log("Error", err);
  } finally {
    connection.release();
  }
};
