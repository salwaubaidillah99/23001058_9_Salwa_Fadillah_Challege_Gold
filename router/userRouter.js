const express = require("express");
const userRouter = express.Router();

const userData = require("../database/dbUser.json");
const { formatResponse } = require("../reponse/response.js");
const { UserController } = require("../controller/userController.js");
const fs = require("fs");

userRouter.route("/register/").post(UserController.registerUser);
userRouter.route("/login").post(UserController.loginUser);
userRouter.route("/update/:id").put(UserController.updateUser);
userRouter.route("/delete/:id").delete(UserController.deleteUser);

module.exports = { userRouter };
