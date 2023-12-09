const express = require("express");
const userRouter = express.Router();

const { formatResponse } = require("../reponse/response.js");
let { user } = require("../database/dbUser.js");

userRouter
  // Ini adalah endpoint getUserAll (Kalau mau buka comment tetap berfungsi)//
  // .get("/getUserAll/", (req, res) => {
  //   let message = "successfully displays all user data ";
  //   res.status(200).json(formatResponse(user, message));
  // })
  .post("/setRegister/", (req, res) => {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json(
          formatResponse(null, "please provide username, email dan password")
        );
    }
    let existingUser = user.find((user) => user.email === email);
    if (existingUser) {
      return res
        .status(400)
        .json(formatResponse(null, "Email Already registerd"));
    }
    let data = {
      idUser: user.length + 1,
      username,
      email,
      password,
    };

    user.push(data);

    res.status(201).json(formatResponse(data, "Registration successful"));
  });

userRouter.post("/setLogin/", (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(
        formatResponse(null, "please provide username, email dan password")
      );
  }
  user = user.find((user) => user.email === email);
  if (user && user.password === password) {
    return res.status(200).json(formatResponse(user, "Login success"));
  } else {
    return res
      .status(401)
      .json(formatResponse(null, "Invalid email or password"));
  }
});

// Ini adalah untuk Get User By Id (Kalau mau buka comment tetap berfungsi)//
// userRouter.get("/getUserById/:userId", (req, res) => {
//   let data = {};
//   let message = "success";
//   let isUserFound = false;

//   let idUser = req.params.userId;

//   for (let i = 0; i < user.length; i++) {
//     if (user[i].idUser === +idUser) {
//       data = user[i];
//       isUserFound = true;
//       break;
//     }
//   }

//   if (isUserFound) {
//     res.status(200).json(formatResponse(data, message));
//   } else {
//     res.status(404).json(formatResponse(data, `User with id ${id} not found`));
//   }
// });

module.exports = userRouter;
