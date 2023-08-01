const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  upsertUser,
} = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

const userRouter = express.Router();

userRouter.get("/", authenticate, getUsers);
userRouter.get("/:id", authenticate, getUserById);
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.patch("/:id", authenticate, updateUser);
userRouter.put("/:id", authenticate, upsertUser);

module.exports = userRouter;
