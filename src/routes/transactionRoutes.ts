import express from "express";
import {
  listTransaction,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController";

const router = express.Router();

router.get("/", listTransaction);
router.post("/", createTransaction);
router.get("/:transaction_id", getTransactionById);
router.put("/:transaction_id", updateTransaction);
router.delete("/:transaction_id", deleteTransaction);

export default router;
