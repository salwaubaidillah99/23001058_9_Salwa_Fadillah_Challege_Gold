const express = require("express");
const userRouter = express.Router();

const { formatResponse } = require("../reponse/response.js");
let { user } = require("../database/dbUser.js");

userRouter.get("/:userId", (req, res) => {
  let data = {};
  let message = "success displays user data according to id";
  let isUserFound = false;

  let idUser = req.params.userId;

  for (let i = 0; i < user.length; i++) {
    if (user[i].id === +idUser) {
      data = user[i];
      isUserFound = true;
      break;
    }
  }

  if (isUserFound) {
    res.status(200).json(formatResponse(data, message));
  } else {
    res
      .status(404)
      .json(formatResponse(data, `User with id ${idUser} not found`));
  }
});

userRouter
  .route("/")
  .get((req, res) => {
    let message = "successfully displays all user data ";
    res.status(200).json(formatResponse(user, message));
  })
  .post((req, res) => {
    let data = {
      idUser: user[user.length - 1].idUser + 1,
      username: req.body.username,
      email: req.body.email,
    };
    user.push(data);

    res.status(201).json(formatResponse(data, "successfully added user data"));
  });

module.exports = userRouter;
