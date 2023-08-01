const jwt = require("jsonwebtoken");
const userTemplateCopy = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const { isInValid, addUserService } = require("../services/userServices");
const {
  generateTokens,
  generateAccessToken,
} = require("../services/authServices");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) return res.status(400).json({ msg: "Bad Request" });

  const dbUser = await userTemplateCopy.findOne({ email }); // Use findOne instead of find

  if (!dbUser) return res.status(401).json({ msg: "Invalid Email" });

  bcrypt.compare(password, dbUser.password, async (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Error comparing passwords:", err });
    } else {
      if (!result) {
        return res.status(401).json({ msg: "Invalid Password" });
      } else {
        const tokens = await generateTokens({ ...dbUser });

        // Update authToken in DB
        const updatedData = await userTemplateCopy.findOneAndUpdate(
          { email },
          { $set: { authToken: tokens.accessToken } },
          { new: true }
        );

        return res.json({
          msg: "Welcome " + dbUser.name,
          data: updatedData,
          tokens,
        });
      }
    }
  });
};
const signup = async (req, res) => {
  const userData = req.body;
  if (isInValid(userData)) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }
  try {
    // Check Duplication of Employee Code
    const dbUser = await userTemplateCopy.findOne({ email: userData.email });
    console.log(dbUser);
    if (dbUser)
      return res.status(400).json({
        msg: "This Email has already been registered",
      });
    const saltPassword = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, saltPassword);

    const resData = await addUserService(userData);
    res.status(201).json({ msg: "User added successfully", data: resData });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const refreshToken = async (req, res, next) => {
  const refreshToken = req.headers.token;
  if (!refreshToken) res.status(401).json({ msg: "Bad request" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(500).json({ msg: "Error comparing tokens!" });

      const accessToken = await generateAccessToken(user);

      // Update authToken in DB
      const updatedData = await userTemplateCopy.findOneAndUpdate(
        { email: user._doc.email },
        { $set: { authToken: accessToken } },
        { new: true }
      );

      res.status(200).json({ accessToken, updatedData });
    }
  );
};

module.exports = { login, signup, refreshToken };
