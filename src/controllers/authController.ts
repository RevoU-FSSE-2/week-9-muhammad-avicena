import { Request, Response } from "express";
import { getListUsersDb } from "../db/userPool";

export const loginController = async (req: Request, res: Response) => {
  const dataUser: any = await getListUsersDb();
  const { user_email, user_password } = req.body;

  const user: any = await dataUser.find(
    (user: any) => user.user_email === user_email
  );

  if (!user || user.user_password !== user_password) {
    return res
      .status(401)
      .json({ message: "Incorrect email or password. Please try again !" });
  }

  res.status(200).json({ message: "Login successful", user: user });
};
