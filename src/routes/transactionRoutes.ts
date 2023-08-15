import express from "express";
import { listTransaction, createTransaction, getTransactionById, updateTransaction, deleteTransaction, updatePriceTransaction } from "../controllers/transactionController";

const router = express.Router();

router.get("/", listTransaction);
router.post("/", createTransaction);
router.get("/:transactionId", getTransactionById);
router.put("/:transactionId", updateTransaction);
router.delete("/:transactionId", deleteTransaction);
router.patch("/:transactionId", updatePriceTransaction);

export default router;
