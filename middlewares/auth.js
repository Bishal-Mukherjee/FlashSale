const jwt = require("jsonwebtoken");
// require("dotenv").config();

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("token");

  //check if no token
  if (!token) {
    return res.status(400).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, "secret", {
      expiresIn: 1000000,
    });
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};
