import { Request, Response } from 'express';
import { transactionData, TransactionInterface } from '../db/transactionData';
import { userData, UserInterface } from '../db/userData';

const isTransactionValid = (
    userId: number,
    productName: string,
    productQuantity: number,
    productPrice: number
): boolean => {
    return (
        userId !== undefined &&
        typeof userId === 'number' &&
        productName !== undefined &&
        typeof productName === 'string' &&
        productQuantity !== undefined &&
        typeof productQuantity === 'number' &&
        productPrice !== undefined &&
        typeof productPrice === 'number'
    );
};

const filteredData: Omit<UserInterface, 'password'>[] = userData.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
});

export const listTransaction = (req: Request, res: Response) => {
    const transactionsWithUserData = transactionData.map((transaction) => {
        const user = filteredData.find((user) => user.userId === transaction.userId);
        if (user) {
            return {
                ...transaction,
                userId: user,
            };
        } else {
            return transaction;
        }
    });

    const response = {
        message: 'List of all transactions',
        transactions: transactionsWithUserData,
    };
    res.status(200).json(response);
};

export const getTransactionById = (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId);

    const transaction = transactionData.find(transaction => transaction.transactionId === transactionId);

    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction found', transaction: transaction });
};

export const createTransaction = (req: Request, res: Response) => {
    const { userId, productName, productQuantity, productPrice } = req.body;

    if (!isTransactionValid(userId, productName, productQuantity, productPrice)) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    const isValidUserId = userData.some((user) => user.userId === userId);

    if (!isValidUserId) {
        return res.status(400).json({ message: 'Invalid input userId, please check the userId on database' });
    }

    const newTransactionId = transactionData.length + 1;

    const newTransaction: TransactionInterface | undefined = {
        transactionId: newTransactionId,
        userId,
        productName,
        productQuantity,
        productPrice,
    };

    transactionData.push(newTransaction);

    res.status(201).json({ message: 'Successfully created a transaction', transaction: newTransaction });
};

export const updateTransaction = (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId);
    const { userId, productName, productQuantity, productPrice } = req.body;

    const transactionIndex = transactionData.findIndex(transaction => transaction.transactionId === transactionId);

    if (transactionIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (isTransactionValid(userId, productName, productQuantity, productPrice)) {
        transactionData[transactionIndex].userId = userId;
        transactionData[transactionIndex].productName = productName;
        transactionData[transactionIndex].productQuantity = productQuantity;
        transactionData[transactionIndex].productPrice = productPrice;
    } else {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    res.status(200).json({ message: 'Successfully updated a transaction', user: transactionData[transactionIndex] });
};

export const updatePriceTransaction = (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId);
    const { productPrice } = req.body;

    const transactionIndex = transactionData.findIndex(transaction => transaction.transactionId === transactionId);

    if (transactionIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (productPrice !== undefined) {
        transactionData[transactionIndex].productPrice = productPrice;
    } else {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    res.status(200).json({ message: 'Transaction price updated', user: transactionData[transactionIndex] });
};

export const deleteTransaction = (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId);

    const transactionIndex = transactionData.findIndex(transaction => transaction.transactionId === transactionId);

    if (transactionIndex === -1) {
        return res.status(404).json({ message: 'Transaction not found' });
    }

    const deletedTransaction = transactionData.splice(transactionIndex, 1)[0];

    res.status(200).json({ message: 'Successfully deleted a transaction', transaction: deletedTransaction });
};

