const jwt = require("jsonwebtoken");
const userTemplateCopy = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const { isInValid, addUserService } = require("../services/userServices");

const login = async (req, res) => {
  const { emp_code, password } = req.body;

  if (!(emp_code && password))
    return res.status(400).json({ msg: "Bad Request" });

  const dbUser = await userTemplateCopy.find({ emp_code });

  if (!dbUser) return res.status(401).json({ msg: "Invalid Employee Code" });

  let newObj = { ...dbUser }[0];

  bcrypt.compare(newObj.password, password, (err, result) => {
    if (err) {
      res.status(500).json({ msg: "Error comparing passwords:", err });
    } else {
      if (!result) {
        res.status(401).json({ msg: "Invalid Password", err });
      }
    }
  });

  const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
  res.json({ msg: "Welcome " + newObj.name, accessToken });
};

const signup = async (req, res) => {
  const userData = req.body;
  if (isInValid(userData)) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }
  try {
    // Check Duplication of Employee Code
    const dbUser = await userTemplateCopy.find({ emp_code: userData.emp_code });
    if (dbUser && dbUser.length > 0)
      throw new Error("Employee code already exist, Try different code!");
    const saltPassword = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, saltPassword);

    const resData = await addUserService(userData);
    res.status(201).json({ msg: "User added successfully", data: resData });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

module.exports = { login, signup };
