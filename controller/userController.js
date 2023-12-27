const userData = require("../database/dbUser.json");
const { formatResponse } = require("../reponse/response.js");
const fs = require("fs");

class UserController {
  static registerUser(req, res) {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      const response = formatResponse(
        null,
        "Username, email, and password are required"
      );
      return res.status(400).json(response);
    }

    let isUsernameTaken = userData.some((u) => u.username === username);
    let isEmailTaken = userData.some((u) => u.email === email);

    if (isUsernameTaken || isEmailTaken) {
      const response = formatResponse(
        null,
        "Username or email is already in use"
      );
      return res.status(409).json(response);
    }

    let newUser = {
      idUser: userData.length + 1,
      username,
      email,
      password,
    };

    userData.push(newUser);
    fs.writeFileSync(
      "./database/dbUser.json",
      JSON.stringify(userData),
      "utf-8"
    );

    const response = formatResponse(newUser);
    return res.json(response);
  }

  static loginUser(req, res) {
    let { email, password } = req.body;

    if ((!email, !password)) {
      const response = formatResponse(null, "Email and Password are required");
      return res.status(400).json(response);
    }

    const user = userData.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      const response = formatResponse(user);
      const currentDate = new Date();
      const formattedDate = `${currentDate.toDateString()}, ${currentDate.toLocaleTimeString(
        "en-US",
        { timeZone: "Asia/Jakarta" }
      )}`;
      user.lastLogin = formattedDate;

      fs.writeFileSync(
        "./database/dbUser.json",
        JSON.stringify(userData),
        "utf-8"
      );
      return res.json(response);
    } else {
      const response = formatResponse(null, "Invalid username or Password");
      return res.status(401).json(response);
    }
  }

  static updateUser(req, res) {
    let userId = parseInt(req.params.id);
    let { username, email, password } = req.body;

    const userIndex = userData.findIndex((user) => user.idUser === userId);

    if (userIndex === -1) {
      const response = formatResponse(null, "User not found");
      return res.status(404).json(response);
    }

    userData[userIndex].username = username || userData[userindex].username;
    userData[userIndex].email = email || userData[userIndex].email;
    userData[userIndex].password = password || userData[userIndex].password;

    fs.writeFileSync("./database/user.json", JSON.stringify(userData), "utf-8");
    const response = formatResponse(userData[userIndex]);
    return res.json(response);
  }

  static deleteUser(req, res) {
    let userId = parseInt(req.params.id);

    const userIndex = userData.findIndex((user) => user.idUser === userId);

    if (userIndex === -1) {
      const response = formatResponse(null, "User not found");
      return res.status(404).json(response);
    }

    const deletedUser = userData.splice(userIndex, 1)[0];
    fs.writeFileSync("./database/user.json", JSON.stringify(userData), "utf-8");
    const response = formatResponse(deletedUser, "Data Delete successfully");
    return res.json(response);
  }
}

module.exports = { UserController };
