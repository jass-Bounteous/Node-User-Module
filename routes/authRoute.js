const express = require("express");
const { login, signup } = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");

const authRouter = express.Router();

authRouter.post("/", login);
authRouter.post("/signup", signup);

module.exports = authRouter;
