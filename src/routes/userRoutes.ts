import express from "express";
import { listUser, updateBalanceUser, getUserById, updateUsernameUser } from "../controllers/userController";

const router = express.Router();

router.get("/", listUser);
router.patch("/:userId", updateBalanceUser);
router.put("/:userId", updateUsernameUser);
router.get("/:userId", getUserById);

export default router;
