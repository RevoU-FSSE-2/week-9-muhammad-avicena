"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionByIdDb = exports.updateTransactionByIdDb = exports.createTransactionDb = exports.getListTransactionByIdDb = exports.getListTransactionsDb = void 0;
const dbConnectionPool_1 = require("./dbConnectionPool");
const getListTransactionsDb = async () => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [rows] = await connection.query(`SELECT * FROM transaction`);
        console.log("List transaction :", rows);
        return rows;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        connection.release();
    }
};
exports.getListTransactionsDb = getListTransactionsDb;
const getListTransactionByIdDb = async (transaction_id) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [rows] = await connection.query(`SELECT * FROM transaction WHERE transaction_id = ?`, [transaction_id]);
        console.log("Get Transaction by ID:", rows);
        return rows;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        connection.release();
    }
};
exports.getListTransactionByIdDb = getListTransactionByIdDb;
const createTransactionDb = async (type_id, user_id, transaction_name, transaction_amount) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [rows] = await connection.query(`INSERT INTO transaction (type_id, user_id, transaction_name, transaction_amount)
      VALUES (?, ?, ?, ?)
      `, [type_id, user_id, transaction_name, transaction_amount]);
        return rows;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        connection.release();
    }
};
exports.createTransactionDb = createTransactionDb;
const updateTransactionByIdDb = async (user_id, type_id, transaction_name, transaction_amount, transaction_id) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result] = await connection.query(` UPDATE transaction SET user_id = ?, type_id = ?, transaction_name = ?, transaction_amount = ?
        WHERE transaction_id = ?
      `, [user_id, type_id, transaction_name, transaction_amount, transaction_id]);
        console.log("Transaction updated:", result);
        return result;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        connection.release();
    }
};
exports.updateTransactionByIdDb = updateTransactionByIdDb;
const deleteTransactionByIdDb = async (transaction_id) => {
    const connection = await (0, dbConnectionPool_1.getConnectionDb)();
    try {
        const [result] = await connection.query(` DELETE FROM transaction 
        WHERE transaction_id = ?
      `, [transaction_id]);
        console.log("Transaction deleted:", result);
        return result;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        connection.release();
    }
};
exports.deleteTransactionByIdDb = deleteTransactionByIdDb;
