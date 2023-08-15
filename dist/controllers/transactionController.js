"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updatePriceTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactionById = exports.listTransaction = void 0;
const transactionData_1 = require("../db/transactionData");
const userData_1 = require("../db/userData");
const isTransactionValid = (userId, productName, productQuantity, productPrice) => {
    return (userId !== undefined &&
        typeof userId === 'number' &&
        productName !== undefined &&
        typeof productName === 'string' &&
        productQuantity !== undefined &&
        typeof productQuantity === 'number' &&
        productPrice !== undefined &&
        typeof productPrice === 'number');
};
const filteredData = userData_1.userData.map((user) => {
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    return userWithoutPassword;
});
const listTransaction = (req, res) => {
    const transactionsWithUserData = transactionData_1.transactionData.map((transaction) => {
        const user = filteredData.find((user) => user.userId === transaction.userId);
        if (user) {
            return Object.assign(Object.assign({}, transaction), { userId: user });
        }
        else {
            return transaction;
        }
    });
    const response = {
        message: 'List of all transactions',
        transactions: transactionsWithUserData,
    };
    res.status(200).json(response);
};
exports.listTransaction = listTransaction;
const getTransactionById = (req, res) => {
    const transactionId = parseInt(req.params.transactionId);
    const transaction = transactionData_1.transactionData.find(transaction => transaction.transactionId === transactionId);
    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction found', transaction: transaction });
};
exports.getTransactionById = getTransactionById;
const createTransaction = (req, res) => {
    const { userId, productName, productQuantity, productPrice } = req.body;
    if (!isTransactionValid(userId, productName, productQuantity, productPrice)) {
        return res.status(400).json({ message: 'Invalid input data' });
    }
    const isValidUserId = userData_1.userData.some((user) => user.userId === userId);
    if (!isValidUserId) {
        return res.status(400).json({ message: 'Invalid input userId, please check the userId on database' });
    }
    const newTransactionId = transactionData_1.transactionData.length + 1;
    const newTransaction = {
        transactionId: newTransactionId,
        userId,
        productName,
        productQuantity,
        productPrice,
    };
    transactionData_1.transactionData.push(newTransaction);
    res.status(201).json({ message: 'Successfully created a transaction', transaction: newTransaction });
};
exports.createTransaction = createTransaction;
const updateTransaction = (req, res) => {
    const transactionId = parseInt(req.params.transactionId);
    const { userId, productName, productQuantity, productPrice } = req.body;
    const transactionIndex = transactionData_1.transactionData.findIndex(transaction => transaction.transactionId === transactionId);
    if (transactionIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (isTransactionValid(userId, productName, productQuantity, productPrice)) {
        transactionData_1.transactionData[transactionIndex].userId = userId;
        transactionData_1.transactionData[transactionIndex].productName = productName;
        transactionData_1.transactionData[transactionIndex].productQuantity = productQuantity;
        transactionData_1.transactionData[transactionIndex].productPrice = productPrice;
    }
    else {
        return res.status(400).json({ message: 'Invalid input data' });
    }
    res.status(200).json({ message: 'Successfully updated a transaction', user: transactionData_1.transactionData[transactionIndex] });
};
exports.updateTransaction = updateTransaction;
const updatePriceTransaction = (req, res) => {
    const transactionId = parseInt(req.params.transactionId);
    const { productPrice } = req.body;
    const transactionIndex = transactionData_1.transactionData.findIndex(transaction => transaction.transactionId === transactionId);
    if (transactionIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (productPrice !== undefined) {
        transactionData_1.transactionData[transactionIndex].productPrice = productPrice;
    }
    else {
        return res.status(400).json({ message: 'Invalid input data' });
    }
    res.status(200).json({ message: 'Transaction price updated', user: transactionData_1.transactionData[transactionIndex] });
};
exports.updatePriceTransaction = updatePriceTransaction;
const deleteTransaction = (req, res) => {
    const transactionId = parseInt(req.params.transactionId);
    const transactionIndex = transactionData_1.transactionData.findIndex(transaction => transaction.transactionId === transactionId);
    if (transactionIndex === -1) {
        return res.status(404).json({ message: 'Transaction not found' });
    }
    const deletedTransaction = transactionData_1.transactionData.splice(transactionIndex, 1)[0];
    res.status(200).json({ message: 'Successfully deleted a transaction', transaction: deletedTransaction });
};
exports.deleteTransaction = deleteTransaction;
