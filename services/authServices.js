const jwt = require("jsonwebtoken");

function generateTokens(user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
}

module.exports = { generateTokens, generateAccessToken };
