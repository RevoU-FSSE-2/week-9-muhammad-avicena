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

export const updateUserByIdDb = async (
  user_id: number,
  user_name: string,
  user_address: string,
  user_email: string,
  user_password: string,
  user_balance: number
) => {
  const connection = await getConnectionDb();
  try {
    const [result] = await connection.query(
      `
        UPDATE users
        SET
          user_name = ?,
          user_address = ?,
          user_email = ?,
          user_password = ?,
          user_balance = ?
        WHERE user_id = ?
      `,
      [
        user_name,
        user_address,
        user_email,
        user_password,
        user_balance,
        user_id,
      ]
      );
      console.log("User updated:", result);
      return result;
  } catch (err) {
    console.log("Error", err);
  } finally {
    connection.release();
  }
};

export const updateUsernameUserDb = async (
  user_id: number,
  user_name: string
) => {
  const connection = await getConnectionDb();

  try {
    const [rows]: any = await connection.query(
      `UPDATE users SET user_name = ? WHERE user_id = ?`,
      [user_name, user_id]
    );
    console.log("Updated username :", rows);
    return rows;
  } catch (err) {
    console.log("Error", err);
  } finally {
    connection.release();
  }
};

export const updateBalanceUserDb = async (
  user_id: number,
  user_balance: number
) => {
  const connection = await getConnectionDb();

  try {
    const [rows]: any = await connection.query(
      `UPDATE users SET user_balance = ? WHERE user_id = ?`,
      [user_balance, user_id]
    );
    console.log("Updated balance :", rows);
    return rows;
  } catch (err) {
    console.log("Error", err);
  } finally {
    connection.release();
  }
};
