"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.listUser = void 0;
const dbConnectionPool_1 = require("../db/dbConnectionPool");
const redisConnection_1 = require("../db/redisConnection");
const listUser = async (req, res, next) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result] = await connection.query(`SELECT * FROM users`);
        res.status(200).json({
            message: "List of all users",
            success: true,
            data: result,
        });
    }
    catch (err) {
        console.log("Caught error :", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        connection.release();
    }
};
exports.listUser = listUser;
const getUserById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    const cacheKey = "user:" + id;
    console.log(cacheKey);
    try {
        const cachedData = await redisConnection_1.redis.hgetall(cacheKey);
        if (cachedData && Object.keys(cachedData).length !== 0) {
            console.log("Cached id user:", id);
            return res.status(200).json({
                message: "List users by id (cached)",
                success: true,
                data: cachedData,
            });
        }
        const [result] = await connection.query(`SELECT
        u.id,
        u.name,
        u.address,
        SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) AS balance,
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) AS expense
      FROM users u
      LEFT JOIN transactions t ON u.id = t.user_id
      WHERE u.id = ?
      GROUP BY u.id;`, [id]);
        if (result.length > 0) {
            const balance = result[0].balance || 0;
            const expense = result[0].expense || 0;
            await redisConnection_1.redis.hmset(cacheKey, {
                id: result[0].id,
                name: result[0].name,
                address: result[0].address,
                balance: balance,
                expense: expense,
            });
            await redisConnection_1.redis.expire(cacheKey, 600);
            console.log("Get user by ID :", result);
            return res.status(200).json({
                message: "List users by id",
                success: true,
                data: result[0],
            });
        }
        else {
            console.log("Not found");
            return res.status(404).json({
                message: "List users by id",
                success: false,
                data: "Not found",
            });
        }
    }
    catch (err) {
        console.log("Caught error :", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        connection.release();
    }
};
exports.getUserById = getUserById;
