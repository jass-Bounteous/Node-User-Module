const mongoose = require("mongoose");
require("dotenv").config();

const DbConnect = () => {
  const dbUrl = process.env.dbUrl;
  mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected!!"))
    .catch((err) => console.log("Error: " + err));
};

module.exports = DbConnect;
