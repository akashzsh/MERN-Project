const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
require("dotenv").config();

module.exports = (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) return next(new HttpError("Authentication failed", 401));
    const decodedToken = jwt.verify(token, process.env.TOKENPRIVATEKEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed", 401));
  }
};
