const express = require("express");
const {
  getUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
  upsetUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", addUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateUser);
userRouter.put("/:id", upsetUser);

module.exports = userRouter;
