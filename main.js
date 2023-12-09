const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

const userRouter = require("./router/userRouter.js");
const itemRouter = require("./router/itemRouter.js");

app.use("/api", userRouter);
app.use("/getItem", itemRouter);

app.listen(PORT, () => {
  console.log(`Server running on port:`, PORT);
});
