"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const userData_1 = require("../db/userData");
const loginController = (req, res) => {
    const { email, password } = req.body;
    const user = userData_1.userData.find(user => user.email === email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Incorrect email or password. Please try again !' });
    }
    const response = ({
        id: user.userId,
        userName: user.username,
        userEmail: user.email,
        balance: user.balance,
        isAuth: true
    });
    res.status(200).json({ message: 'Login successful', user: response });
};
exports.loginController = loginController;
