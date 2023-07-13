const express = require("express");

const userRouter = require("./routes/userRoute");
const methodLogger = require("./middleware/logger");
const DbConnect = require("./dbConfig");

const app = express();
app.use(express.json());
app.use(methodLogger);

console.log("hello world!");

DbConnect();

app.use("/app", userRouter);
app.listen(5000, () => console.log("App started!"));
