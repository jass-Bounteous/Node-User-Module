const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.status(401).json({ msg: "UnAuthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send(403).json({ msg: "Un-Authorized" });
    req.user = user;
    next();
  });
};

module.exports = authenticate;
