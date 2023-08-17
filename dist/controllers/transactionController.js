"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.listTransaction = void 0;
const dbConnectionPool_1 = require("../db/dbConnectionPool");
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
const listTransaction = async (req, res) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result] = await connection.query(`SELECT * FROM transactions`);
        res.status(200).json({
            message: "List of all transactions",
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
exports.listTransaction = listTransaction;
const createTransaction = async (req, res) => {
    const { user_id, type, amount } = req.body;
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result] = await connection.query(`INSERT INTO transactions (user_id, type, amount)
      VALUES (?, ?, ?)
      `, [user_id, type, amount]);
        console.log("Create transaction :", result);
        return res.status(200).json({
            message: "Successfully created a transaction",
            success: true,
            data: { id: result.insertId, user_id, type, amount },
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
exports.createTransaction = createTransaction;
const updateTransaction = async (req, res) => {
    const id = parseInt(req.params.id);
    const { user_id, type, amount } = req.body;
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    const cacheKey = "user:" + user_id;
    console.log(cacheKey);
    try {
        const [result] = await connection.query(` UPDATE transactions SET user_id = ?, type = ?, amount = ?
        WHERE id = ?
      `, [user_id, type, amount, id]);
        console.log("Update transaction :", result);
        if (result.affectedRows > 0) {
            await redis.del(cacheKey);
            return res.status(200).json({
                message: "Successfully updated a transaction",
                success: true,
                data: { id, user_id, type, amount },
            });
        }
        else {
            return res.status(404).json({
                message: "Failed updated a transaction",
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
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res) => {
    const id = parseInt(req.params.id);
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result] = await connection.query(` DELETE FROM transactions 
        WHERE id = ?
      `, [id]);
        console.log("Update transaction :", result);
        if (result.affectedRows > 0) {
            return res.status(200).json({
                message: "Successfully deleted a transaction",
                success: true,
                data: { id },
            });
        }
        else {
            return res.status(404).json({
                message: "Failed deleted a transaction",
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
exports.deleteTransaction = deleteTransaction;
