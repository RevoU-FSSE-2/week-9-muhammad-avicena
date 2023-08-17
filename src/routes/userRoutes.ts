import express from "express";
import { listUser, getUserById } from "../controllers/userController";

const router = express.Router();

router.get("/", listUser);
router.get("/:id", getUserById);

export default router;
