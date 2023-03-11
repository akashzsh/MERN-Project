const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(
      new HttpError("Something went wrong. Could not retrieve users", 500)
    );
  }

  if (!users || users.length === 0)
    return next(new HttpError("No users found", 404));

  res.json({ users });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(new HttpError("Invalid request body", 422));
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something went wrong. Could not sign up", 500));
  }

  if (existingUser)
    return next(
      new HttpError("User already exists. Please login instead", 422)
    );

  const createdUser = new User({
    name,
    email,
    image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again.", 500));
  }

  res.status(201).json({ user: createdUser });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(new HttpError("Invalid request body", 422));

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something went wrong. Could not login", 500));
  }

  if (!existingUser || existingUser.password !== password)
    return next(new HttpError("Invalid Credentials. Could not login", 401));

  res.json({ message: "Login Successful", user: existingUser });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
