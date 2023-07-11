const userTemplateCopy = require("../schema/userSchema");

const getUsers = (req, res) => {
  console.log("get user route called");
  //   res.json({ message: "get route called" });

  userTemplateCopy
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
};

const getUserById = (req, res) => {
  console.log("get user by ID route called");
  //   res.json({ message: "get route called" });

  userTemplateCopy
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
};

const deleteUser = (req, res) => {
  console.log("delete user by ID route called");
  //   res.json({ message: "get route called" });

  userTemplateCopy
    .findByIdAndRemove(req.params.id)
    .then((data) => {
      res.json({ msg: data, status: "successs" });
    })
    .catch((err) => console.log(err));
};

const updateUser = async (req, res) => {
  console.log("update user by ID route called");

  try {
    const user = await userTemplateCopy.findById(req.params.id);

    // console.log(req.body);

    const { name, mobile_no, email } = req.body;

    // user.mobile_no = 1234567890;

    user.name = name ? name : user.name;
    user.mobile_no = mobile_no ? mobile_no : user.mobile_no;
    user.email = email ? email : user.email;

    const updatedData = await user.save();

    res.json(updatedData);
  } catch (err) {
    console.log("Error updating user, err: " + err);
  }
  //   res.json({ message: "get route called" });

  // userTemplateCopy
  //   .findByIdAndRemove(req.params.id)
  //   .then((data) => {
  //     res.json({ msg: data, status: "successs" });
  //   })
  //   .catch((err) => console.log(err));
};

const addUser = async (req, res) => {
  console.log("add user route called");
  //   res.json({ message: "get route called" });

  // console.log(req);

  const newUser = req.body;
  console.log(newUser);

  const resData = userTemplateCopy.create(newUser).then((res) => {
    console.log(res.data);
    return res.data;
  });

  res.json({ message: "User added successfully", data: resData });
};

module.exports = { getUsers, addUser, getUserById, deleteUser, updateUser };
