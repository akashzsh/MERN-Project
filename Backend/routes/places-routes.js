const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("This is places-routes");
  res.json({ message: "It works" });
});

module.exports = router;
