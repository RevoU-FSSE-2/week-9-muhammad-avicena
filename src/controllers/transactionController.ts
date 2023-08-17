import { Request, Response } from "express";
import {
  getListTransactionsDb,
  createTransactionDb,
  updateTransactionByIdDb,
  deleteTransactionByIdDb,
  getListTransactionByIdDb,
} from "../db/transactionPool";

export const listTransaction = async (req: Request, res: Response) => {
  const transactionData = await getListTransactionsDb();
  try {
    const response = {
      message: "List of all transactions",
      transaction: transactionData,
    };
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  const transaction_id = parseInt(req.params.transaction_id);

  try {
    const transacionData: any = await getListTransactionByIdDb(transaction_id);
    console.log("result", transacionData);
    if (transacionData.length == 0) {
      return res.status(404).json({ message: "Transaction not found" });
    } else {
      return res
        .status(200)
        .json({ message: "List transaction", transaction: transacionData });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { type_id, user_id, transaction_name, transaction_amount } = req.body;
  try {
    await createTransactionDb(
      type_id,
      user_id,
      transaction_name,
      transaction_amount
    );
    res.status(200).json({
      message: "Successfully created a transaction",
      transaction: {
        type_id,
        user_id,
        transaction_name,
        transaction_amount,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const transaction_id = parseInt(req.params.transaction_id);
  const { user_id, type_id, transaction_name, transaction_amount } = req.body;

  try {
    const transactionData: any = await updateTransactionByIdDb(
      user_id,
      type_id,
      transaction_name,
      transaction_amount,
      transaction_id
    );
    if (
      transactionData.affectedRows == 0 ||
      transactionData.affectedRows == undefined
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    } else {
      res.status(200).json({
        message: "Successfully updated a transaction",
        user: { user_id, type_id, transaction_name, transaction_amount },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const transaction_id = parseInt(req.params.transaction_id);

  try {
    const transactionData: any = await deleteTransactionByIdDb(transaction_id);
    if (
      transactionData.affectedRows == 0 ||
      transactionData.affectedRows == undefined
    ) {
      return res.status(400).json({ message: "Invalid data input" });
    } else {
      return res.status(200).json({
        message: "Successfully deleted",
        transaction_id: transaction_id,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
