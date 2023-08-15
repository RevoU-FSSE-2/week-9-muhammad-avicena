"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
router.get("/", transactionController_1.listTransaction);
router.post("/", transactionController_1.createTransaction);
router.get("/:transactionId", transactionController_1.getTransactionById);
router.put("/:transactionId", transactionController_1.updateTransaction);
router.delete("/:transactionId", transactionController_1.deleteTransaction);
router.patch("/:transactionId", transactionController_1.updatePriceTransaction);
exports.default = router;
