const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "Some error occurred" });
});

mongoose
  .connect(
    `mongodb+srv://akashzsh:${process.env.MONGODBPASSWORD}@mern.5gjhp6e.mongodb.net/mern_udemy?retryWrites=true&w=majority`
  )
  .then(() => app.listen(5000))
  .catch((error) => console.log(error));
