const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Akash",
    email: "akash@gmail.com",
    password: "password1",
  },
  {
    id: "u2",
    name: "Aaditya",
    email: "aaditya@gmail.com",
    password: "password2",
  },
  {
    id: "u3",
    name: "Aman",
    email: "aman@gmail.com",
    password: "password3",
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ data: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const newUser = req.body;

  const hasUser = DUMMY_USERS.find(
    (currUser) => currUser.email == newUser.email
  );
  if (hasUser) return next(new HttpError("Already Registered User", 422));

  DUMMY_USERS = { ...DUMMY_USERS, newUser };
  res.status(201).json(DUMMY_USERS);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find(
    (currUser) => currUser.email === email
  );
  if (!identifiedUser || !identifiedUser.password === password)
    return next(new HttpError("Could not find the user", 401));
  res.json({ message: "login successful" });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
