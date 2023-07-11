const express = require("express");
const {
  getUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const userRouter = express.Router();

// userRouter.route("/user").get((req, res) => {
//   console.log("get route called");
//   res.send("get route da bot uh");
// });

userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUserById);
userRouter.post("/user", addUser);
userRouter.delete("/user/:id", deleteUser);
userRouter.patch("/user/:id", updateUser);

module.exports = userRouter;
