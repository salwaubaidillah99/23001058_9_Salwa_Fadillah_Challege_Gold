const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const userRouter = require("./router/userRouter.js");
const itemRouter = require("./router/itemRouter.js");

app.use("/api", userRouter);
app.use("/api", itemRouter);

app.listen(PORT, () => {
  console.log(`Server running on port:`, PORT);
});
