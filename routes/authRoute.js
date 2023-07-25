const express = require("express");
const { login, signup,refreshToken } = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");

const authRouter = express.Router();

authRouter.post("/", login);
authRouter.post("/signup", signup);
authRouter.post("/refreshToken", refreshToken);

module.exports = authRouter;
