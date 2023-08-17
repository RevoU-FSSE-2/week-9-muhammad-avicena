import { Request, Response, NextFunction } from "express";
import {
  getListUsersDb,
  getUsersByIdDb,
} from "../db/userPool";

export const listUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dataUser = await getListUsersDb();
  res.status(200).json({
    message: "List of all users",
    users: dataUser,
  });
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = parseInt(req.params.user_id);

  try {
    const dataUser: any = await getUsersByIdDb(user_id);
    if (!dataUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user: dataUser });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
