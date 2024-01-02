const express = require("express");
const morgan = require("morgan");
const { userRouter } = require("./router/userRouter.js");
const { itemRouter } = require("./router/itemRouter.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", userRouter);
app.use("/api", itemRouter);

app.listen(PORT, () => {
  console.log(`Server running on port:`, PORT);
});
