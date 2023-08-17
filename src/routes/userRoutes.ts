import express from "express";
import { listUser, updateBalanceUser, getUserById, updateUsernameUser, updateUserById } from "../controllers/userController";

const router = express.Router();

router.get("/", listUser);
router.get("/:user_id", getUserById);
router.put("/:user_id", updateUserById);
router.patch("/balance/:user_id", updateBalanceUser);
router.patch("/username/:user_id", updateUsernameUser);

export default router;
