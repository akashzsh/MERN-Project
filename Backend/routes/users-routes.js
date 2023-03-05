const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

router.get("/", usersController.getAllUsers);
router.post(
  "/signup",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  usersController.signup
);
router.post("/login", [check("email").isEmail()], usersController.login);

module.exports = router;
