const userTemplateCopy = require("../schema/userSchema");
const {
  isInValid,
  checkUser,
  addUserService,
} = require("../services/userServices");

const getUsers = (req, res) => {
  userTemplateCopy
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: "Err: " + err });
    });
};

const getUserById = async (req, res) => {
  if (await checkUser(req.params.id)) {
    userTemplateCopy
      .findById(req.params.id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => res.status(400).json({ msg: "Err: " + err }));
  } else {
    res.status(400).json({ msg: "No User found" });
  }
};

const deleteUser = async (req, res) => {
  let logUser = req.user._doc;

  // Check for Admin or Corresponding user
  if (!(logUser._id === req.params.id || logUser.emp_code === "1000"))
    return res.status(401).json({ msg: "Unauthorized" });

  if (await checkUser(req.params.id)) {
    userTemplateCopy
      .findByIdAndRemove(req.params.id)
      .then((data) => {
        res
          .status(200)
          .json({ status: `User(${data.name}) deleted successfully` });
      })
      .catch((err) => res.status(400).json({ msg: "Err: " + err }));
  } else {
    res.status(400).json({ msg: "No User found" });
  }
};

const updateUser = async (req, res) => {
  let logUser = req.user._doc;

  // Check for Admin or Corresponding user
  if (!(logUser._id === req.params.id || logUser.emp_code === "1000"))
    return res.status(401).json({ msg: "Unauthorized" });
  if (await checkUser(req.params.id)) {
    try {
      const user = await userTemplateCopy.findById(req.params.id);

      const { name, mobile_no, email } = req.body;

      user.name = name ? name : user.name;
      user.mobile_no = mobile_no ? mobile_no : user.mobile_no;
      user.email = email ? email : user.email;

      const updatedData = await user.save();

      res.status(200).json(updatedData);
    } catch (err) {
      res.status(400).json({ msg: "Error updating user, err: " + err });
    }
  } else {
    res.status(400).json({ msg: "No User found" });
  }
};

const upsertUser = async (req, res) => {
  let logUser = req.user._doc;

  // Check for Admin or Corresponding user
  if (!(logUser._id === req.params.id || logUser.emp_code === "1000"))
    return res.status(401).json({ msg: "Unauthorized" });

  if (isInValid(req.body)) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }

  try {
    if (await checkUser(req.params.id)) {
      const user = await userTemplateCopy.findById(req.params.id);

      const { name, mobile_no, email } = req.body;

      user.name = name ? name : user.name;
      user.mobile_no = mobile_no ? mobile_no : user.mobile_no;
      // user.email = email ? email : user.email;

      const updatedData = await user.save();

      res.status(200).json({
        msg: "Data updated! NOTE: Email, Password and Employee Code can't be updated, contact ADMIN in such case",
        data: updatedData,
      });
    } else {
      const resData = addUserService(req.body);
      res.status(201).json({ msg: "User added successfully", data: resData });
    }
  } catch (err) {
    res.status(400).json({ msg: "Error updating user, err: " + err });
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  upsertUser,
};
