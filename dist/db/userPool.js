"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByIdDb = exports.getListUsersDb = void 0;
const dbConnectionPool_1 = require("./dbConnectionPool");
// User database connection
const getListUsersDb = async () => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [rows] = await connection.query(`SELECT * FROM users`);
        console.log("List user :", rows);
        return rows;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        connection.release();
    }
};
exports.getListUsersDb = getListUsersDb;
const getUsersByIdDb = async (user_id) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result] = await connection.query(`SELECT * FROM users WHERE user_id = ?`, [user_id]);
        console.log("Get user by ID :", result);
        return result;
    }
    catch (err) {
        console.log("Error", err);
    }
    finally {
        connection.release();
    }
};
exports.getUsersByIdDb = getUsersByIdDb;
