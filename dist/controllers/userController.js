"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBalanceUser = exports.updateUsernameUser = exports.updateUserById = exports.getUserById = exports.listUser = void 0;
const userPool_1 = require("../db/userPool");
const listUser = async (req, res, next) => {
    const dataUser = await (0, userPool_1.getListUsersDb)();
    res.status(200).json({
        message: "List of all users",
        users: dataUser,
    });
};
exports.listUser = listUser;
const getUserById = async (req, res, next) => {
    const user_id = parseInt(req.params.user_id);
    try {
        const dataUser = await (0, userPool_1.getUsersByIdDb)(user_id);
        if (!dataUser) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", user: dataUser });
    }
    catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserById = getUserById;
const updateUserById = async (req, res, next) => {
    const user_id = parseInt(req.params.user_id);
    const { user_name, user_address, user_email, user_password, user_balance } = req.body;
    try {
        const updateUser = await (0, userPool_1.updateUserByIdDb)(user_id, user_name, user_address, user_email, user_password, user_balance);
        const dataUser = await (0, userPool_1.getUsersByIdDb)(user_id);
        if (updateUser.affectedRows == 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        else {
            res.status(200).json({ message: "User updated", user: dataUser });
        }
    }
    catch (error) {
        console.log("Error :", error);
        res.status(500).json({ message: error.message });
    }
};
exports.updateUserById = updateUserById;
const updateUsernameUser = async (req, res, next) => {
    const user_id = parseInt(req.params.user_id);
    const { user_name } = req.body;
    try {
        const updateUser = await (0, userPool_1.updateUsernameUserDb)(user_id, user_name);
        const dataUser = await (0, userPool_1.getUsersByIdDb)(user_id);
        if (updateUser.affectedRows == 0 || updateUser.affectedRows == undefined) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        else {
            res.status(200).json({ message: "Username updated", user: dataUser });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUsernameUser = updateUsernameUser;
const updateBalanceUser = async (req, res, next) => {
    const user_id = parseInt(req.params.user_id);
    const { user_balance } = req.body;
    try {
        const updateUser = await (0, userPool_1.updateBalanceUserDb)(user_id, user_balance);
        const dataUser = await (0, userPool_1.getUsersByIdDb)(user_id);
        if (updateUser.affectedRows == 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        else {
            res.status(200).json({ message: "Username updated", user: dataUser });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateBalanceUser = updateBalanceUser;
