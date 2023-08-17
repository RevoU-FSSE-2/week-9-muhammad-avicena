import express from "express";
import {
  listTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController";

const router = express.Router();

router.get("/", listTransaction);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
