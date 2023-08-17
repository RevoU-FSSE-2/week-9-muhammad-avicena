import { Request, Response } from "express";
import { getConnectionDb } from "../db/dbConnectionPool";
import { redis } from "../db/redisConnection";


export const listTransaction = async (req: Request, res: Response) => {
  const connection = await getConnectionDb();

  try {
    const [result] = await connection.query(`SELECT * FROM transactions`);
    res.status(200).json({
      message: "List of all transactions",
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Caught error :", err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { user_id, type, amount } = req.body;
  const connection = await getConnectionDb();

  try {
    const [result]: any = await connection.query(
      `INSERT INTO transactions (user_id, type, amount)
      VALUES (?, ?, ?)
      `,
      [user_id, type, amount]
    );
    console.log("Create transaction :", result);
    return res.status(200).json({
      message: "Successfully created a transaction",
      success: true,
      data: { id: result.insertId, user_id, type, amount },
    });
  } catch (err) {
    console.log("Caught error :", err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { user_id, type, amount } = req.body;
  const connection = await getConnectionDb();
  const cacheKey = "user:" + user_id;
  console.log(cacheKey);

  try {
    const [result]: any = await connection.query(
      ` UPDATE transactions SET user_id = ?, type = ?, amount = ?
        WHERE id = ?
      `,
      [user_id, type, amount, id]
    );
    console.log("Update transaction :", result);
    if (result.affectedRows > 0) {
      await redis.del(cacheKey);
      return res.status(200).json({
        message: "Successfully updated a transaction",
        success: true,
        data: { id, user_id, type, amount },
      });
    } else {
      return res.status(404).json({
        message: "Failed updated a transaction",
        success: false,
        data: "Not found",
      });
    }
  } catch (err) {
    console.log("Caught error :", err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const connection = await getConnectionDb();

  try {
    const [result]: any = await connection.query(
      ` DELETE FROM transactions 
        WHERE id = ?
      `,
      [id]
    );
    console.log("Update transaction :", result);
    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Successfully deleted a transaction",
        success: true,
        data: { id },
      });
    } else {
      return res.status(404).json({
        message: "Failed deleted a transaction",
        success: false,
        data: "Not found",
      });
    }
  } catch (err) {
    console.log("Caught error :", err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
};
