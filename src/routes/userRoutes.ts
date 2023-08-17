import express from "express";
import { listUser, getUserById } from "../controllers/userController";

const router = express.Router();

router.get("/", listUser);
router.get("/:user_id", getUserById);

export default router;
