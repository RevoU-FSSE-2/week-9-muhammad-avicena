import express from "express";
import { listUser, updateBalanceUser, getUserById, updateUsernameUser } from "../controllers/userController";

const router = express.Router();

router.get("/", listUser);
router.patch("/:user_id", updateBalanceUser);
router.put("/:user_id", updateUsernameUser);
router.get("/:user_id", getUserById);

export default router;
