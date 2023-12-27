const express = require("express");
const morgan = require("morgan");
const { userRouter } = require("./router/userRouter.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port:`, PORT);
});
