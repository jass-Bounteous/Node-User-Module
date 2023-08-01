const express = require("express");

const userRouter = require("./routes/userRoute");
const methodLogger = require("./middleware/logger");
const DbConnect = require("./dbConfig");
const authRouter = require("./routes/authRoute");

const app = express();
app.use(express.json());
app.use(methodLogger);

console.log("hello world!");

DbConnect();

app.use("/app/", authRouter);
app.use("/app/user", userRouter);
app.listen(5000, () => console.log("App started!"));
