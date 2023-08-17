"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByIdDb = exports.getListUsersDb = void 0;
const dbConnectionPool_1 = require("./dbConnectionPool");
// User database connection
const getListUsersDb = async () => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result, err] = await connection.query(`SELECT * FROM user`);
        // console.log("error",err)
        console.log("result", result);
        console.log("err", err);
    }
    catch (err) {
        console.log("Caught error :", err);
        return err;
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
