const mongoose = require("mongoose");

const userTemplate = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  emp_code: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userTemplate);
