"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const userPool_1 = require("../db/userPool");
const loginController = async (req, res) => {
    const dataUser = await (0, userPool_1.getListUsersDb)();
    const { user_email, user_password } = req.body;
    const user = await dataUser.find((user) => user.user_email === user_email);
    if (!user || user.user_password !== user_password) {
        return res
            .status(401)
            .json({ message: "Incorrect email or password. Please try again !" });
    }
    res.status(200).json({ message: "Login successful", user: user });
};
exports.loginController = loginController;
