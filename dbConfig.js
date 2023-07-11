const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://jassy:Ehstw8u6HnDOVPnl@cluster0.rwmx5.mongodb.net/usertask?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected!!"))
  .catch((err) => console.log("Error: " + err));