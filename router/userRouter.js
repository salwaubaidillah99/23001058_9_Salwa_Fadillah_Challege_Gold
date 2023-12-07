const express = require("express");
const userRouter = express.Router();

const { formatResponse } = require("../reponse/response.js");
let { user } = require("../database/dbUser.js");

userRouter.get("/:userId", (req, res) => {
  let data = {};
  let message = "success";
  let isUserFound = false;

  let id = req.params.userId;

  for (let i = 0; i < user.length; i++) {
    if (user[i].id === +id) {
      data = user[i];
      isUserFound = true;
      break;
    }
  }

  if (isUserFound) {
    res.status(200).json(formatResponse(data, message));
  } else {
    res.status(404).json(formatResponse(data, `User with id ${id} not found`));
  }
});

userRouter.route("/").get((req, res) => {
  let message = "success";
  res.status(200).json(formatResponse(user, message));
});

module.exports = userRouter;
