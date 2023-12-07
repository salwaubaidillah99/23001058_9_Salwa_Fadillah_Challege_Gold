const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

const userRouter = require("./router/userRouter.js");

app.use("/getUser", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port:`, PORT);
});
