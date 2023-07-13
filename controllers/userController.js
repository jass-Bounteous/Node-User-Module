const userTemplateCopy = require("../schema/userSchema");

const getUsers = (req, res) => {
  userTemplateCopy
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
};

const getUserById = (req, res) => {
  userTemplateCopy
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
};

const deleteUser = (req, res) => {
  userTemplateCopy
    .findByIdAndRemove(req.params.id)
    .then((data) => {
      res.json({ msg: data, status: "successs" });
    })
    .catch((err) => console.log(err));
};

const updateUser = async (req, res) => {
  try {
    const user = await userTemplateCopy.findById(req.params.id);

    const { name, mobile_no, email } = req.body;

    user.name = name ? name : user.name;
    user.mobile_no = mobile_no ? mobile_no : user.mobile_no;
    user.email = email ? email : user.email;

    const updatedData = await user.save();

    res.json(updatedData);
  } catch (err) {
    console.log("Error updating user, err: " + err);
  }
};

const addUser = async (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  const resData = userTemplateCopy.create(newUser).then((res) => {
    console.log(res.data);
    return res.data;
  });

  res.json({ message: "User added successfully", data: resData });
};

module.exports = { getUsers, addUser, getUserById, deleteUser, updateUser };
