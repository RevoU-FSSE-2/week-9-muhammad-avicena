import { Request, Response, NextFunction } from "express";
import {
  getListUsersDb,
  getUsersByIdDb,
  updateUsernameUserDb,
  updateBalanceUserDb,
  updateUserByIdDb,
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

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = parseInt(req.params.user_id);
  const { user_name, user_address, user_email, user_password, user_balance } =
    req.body;
  try {
    const updateUser: any = await updateUserByIdDb(
      user_id,
      user_name,
      user_address,
      user_email,
      user_password,
      user_balance
    );
    const dataUser: any = await getUsersByIdDb(user_id);
    if (updateUser.affectedRows == 0) {
      return res.status(400).json({ message: "Invalid input data" });
    } else {
      res.status(200).json({ message: "User updated", user: dataUser });
    }
  } catch (error: any) {
    console.log("Error :", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUsernameUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = parseInt(req.params.user_id);
  const { user_name } = req.body;

  try {
    const updateUser: any = await updateUsernameUserDb(user_id, user_name);
    const dataUser: any = await getUsersByIdDb(user_id);
    if (updateUser.affectedRows == 0 || updateUser.affectedRows == undefined) {
      return res.status(400).json({ message: "Invalid input data" });
    } else {
      res.status(200).json({ message: "Username updated", user: dataUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBalanceUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = parseInt(req.params.user_id);
  const { user_balance } = req.body;

  try {
    const updateUser: any = await updateBalanceUserDb(user_id, user_balance);
    const dataUser: any = await getUsersByIdDb(user_id);
    if (updateUser.affectedRows == 0) {
      return res.status(400).json({ message: "Invalid input data" });
    } else {
      res.status(200).json({ message: "Username updated", user: dataUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
