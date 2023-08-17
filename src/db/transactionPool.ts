import { getConnectionDb } from "./dbConnectionPool";

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

export const createTransactionDb = async (
  type_id: number,
  user_id: number,
  transaction_name: string,
  transaction_amount: number
) => {
  const connection = await getConnectionDb();

  try {
    const [rows] = await connection.query(
      `INSERT INTO transaction (type_id, user_id, transaction_name, transaction_amount)
      VALUES (?, ?, ?, ?)
      `,
      [type_id, user_id, transaction_name, transaction_amount]
    );
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.release();
  }
};

export const updateTransactionaByIdDb = async (
  user_id: number,
  type_id: number,
  transaction_name: string,
  transaction_amount: number,
  transaction_id: number
) => {
  const connection = await getConnectionDb();

  try {
    const [result] = await connection.query(
      ` UPDATE transaction SET user_id = ?, type_id = ?, transaction_name = ?, transaction_amount = ?
        WHERE transaction_id = ?
      `,
      [user_id, type_id, transaction_name, transaction_amount, transaction_id]
    );
    console.log("Transaction updated:", result);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    connection.release();
  }
};
