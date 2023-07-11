const express = require("express");

const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json());

console.log("hello world!");

app.use("/app", userRouter);

app.listen(5000, () => console.log("App started!"));