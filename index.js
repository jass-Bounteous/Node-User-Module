const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json());

console.log("hello world!");

app.use("/app", userRouter);

const dbUrl =
  "mongodb+srv://jassy:Ehstw8u6HnDOVPnl@cluster0.rwmx5.mongodb.net/usertask?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log("App started!"));
  })
  .catch((err) => console.log("Error: " + err));
