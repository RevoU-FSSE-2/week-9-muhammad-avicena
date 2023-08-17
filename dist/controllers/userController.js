"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.listUser = void 0;
const dbConnectionPool_1 = require("../db/dbConnectionPool");
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
    try {
        const [result] = await connection.query(`SELECT * FROM users WHERE id = ?`, [id]);
        if (result.length > 0) {
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
