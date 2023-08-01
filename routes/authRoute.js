const express = require("express");
const {
  login,
  signup,
  refreshToken,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/refreshToken", refreshToken);

module.exports = authRouter;
