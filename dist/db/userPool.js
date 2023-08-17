"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBalanceUserDb = exports.updateUsernameUserDb = exports.updateUserByIdDb = exports.getUsersByIdDb = exports.getListUsersDb = void 0;
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
        connection.release();
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
const updateUserByIdDb = async (user_id, user_name, user_address, user_email, user_password, user_balance) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result] = await connection.query(`
        UPDATE users
        SET
          user_name = ?,
          user_address = ?,
          user_email = ?,
          user_password = ?,
          user_balance = ?
        WHERE user_id = ?
      `, [
            user_name,
            user_address,
            user_email,
            user_password,
            user_balance,
            user_id,
        ]);
        console.log("User updated:", result);
        return result;
    }
    catch (err) {
        console.log("Error", err);
    }
    finally {
        connection.release();
    }
};
exports.updateUserByIdDb = updateUserByIdDb;
const updateUsernameUserDb = async (user_id, user_name) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [rows] = await connection.query(`UPDATE users SET user_name = ? WHERE user_id = ?`, [user_name, user_id]);
        console.log("Updated username :", rows);
        return rows;
    }
    catch (err) {
        console.log("Error", err);
    }
    finally {
        connection.release();
    }
};
exports.updateUsernameUserDb = updateUsernameUserDb;
const updateBalanceUserDb = async (user_id, user_balance) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [rows] = await connection.query(`UPDATE users SET user_balance = ? WHERE user_id = ?`, [user_balance, user_id]);
        console.log("Updated balance :", rows);
        return rows;
    }
    catch (err) {
        console.log("Error", err);
    }
    finally {
        connection.release();
    }
};
exports.updateBalanceUserDb = updateBalanceUserDb;
