"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.listUser = void 0;
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
