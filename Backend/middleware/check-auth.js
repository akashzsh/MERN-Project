const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) return next(new HttpError("Authentication failed", 401));
    const decodedToken = jwt.verify(token, "supersecret");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed", 401));
  }
};
