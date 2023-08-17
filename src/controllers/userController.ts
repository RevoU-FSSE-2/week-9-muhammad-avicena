import { Request, Response, NextFunction } from "express";
import { getConnectionDb } from "../db/dbConnectionPool";
import Redis from "ioredis";

const redis = new Redis();

export const listUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connection = await getConnectionDb();

  try {
    const [result]: any = await connection.query(`SELECT * FROM users`);
    res.status(200).json({
      message: "List of all users",
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

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const connection = await getConnectionDb();
  const cacheKey = "user:" + id;
  console.log(cacheKey);
  try {
    const cachedData = await redis.hgetall(cacheKey);
    if (cachedData && Object.keys(cachedData).length !== 0) {
      console.log("Cached id user:", id);
      return res.status(200).json({
        message: "List users by id (cached)",
        success: true,
        data: cachedData,
      });
    }
    const [result]: any = await connection.query(
      `SELECT
        u.id,
        u.name,
        u.address,
        SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) AS balance,
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) AS expense
      FROM users u
      LEFT JOIN transactions t ON u.id = t.user_id
      WHERE u.id = ?
      GROUP BY u.id;`,
      [id]
    );
    if (result.length > 0) {
      const balance = result[0].balance || 0;
      const expense = result[0].expense || 0;

      await redis.hmset(cacheKey, {
        id: result[0].id,
        name: result[0].name,
        address: result[0].address,
        balance: balance,
        expense: expense,
      });

      await redis.expire(cacheKey, 600);

      console.log("Get user by ID :", result);
      return res.status(200).json({
        message: "List users by id",
        success: true,
        data: result[0],
      });
    } else {
      console.log("Not found");
      return res.status(404).json({
        message: "List users by id",
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
