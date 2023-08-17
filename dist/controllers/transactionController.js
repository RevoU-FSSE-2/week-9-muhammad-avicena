"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactionById = exports.listTransaction = void 0;
const transactionPool_1 = require("../db/transactionPool");
const listTransaction = async (req, res) => {
    const transactionData = await (0, transactionPool_1.getListTransactionsDb)();
    try {
        const response = {
            message: "List of all transactions",
            transaction: transactionData,
        };
        res.status(200).json(response);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
};
exports.listTransaction = listTransaction;
const getTransactionById = async (req, res) => {
    const transaction_id = parseInt(req.params.transaction_id);
    try {
        const transacionData = await (0, transactionPool_1.getListTransactionByIdDb)(transaction_id);
        console.log("result", transacionData);
        if (transacionData.length == 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        else {
            return res
                .status(200)
                .json({ message: "List transaction", transaction: transacionData });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
exports.getTransactionById = getTransactionById;
const createTransaction = async (req, res) => {
    const { type_id, user_id, transaction_name, transaction_amount } = req.body;
    try {
        const result = await (0, transactionPool_1.createTransactionDb)(type_id, user_id, transaction_name, transaction_amount);
        console.log(result);
        console.log(result.insertId);
        res.status(200).json({
            message: "Successfully created a transaction",
            transaction: {
                transaction_id: result.insertId,
                type_id,
                user_id,
                transaction_name,
                transaction_amount,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.createTransaction = createTransaction;
const updateTransaction = async (req, res) => {
    const transaction_id = parseInt(req.params.transaction_id);
    const { user_id, type_id, transaction_name, transaction_amount } = req.body;
    try {
        const transactionData = await (0, transactionPool_1.updateTransactionByIdDb)(user_id, type_id, transaction_name, transaction_amount, transaction_id);
        if (transactionData.affectedRows == 0 ||
            transactionData.affectedRows == undefined) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        else {
            res.status(200).json({
                message: "Successfully updated a transaction",
                user: { user_id, type_id, transaction_name, transaction_amount },
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res) => {
    const transaction_id = parseInt(req.params.transaction_id);
    try {
        const transactionData = await (0, transactionPool_1.deleteTransactionByIdDb)(transaction_id);
        if (transactionData.affectedRows == 0 ||
            transactionData.affectedRows == undefined) {
            return res.status(400).json({ message: "Invalid data input" });
        }
        else {
            return res.status(200).json({
                message: "Successfully deleted",
                transaction_id: transaction_id,
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteTransaction = deleteTransaction;
