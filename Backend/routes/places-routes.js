const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Australia",
    description:
      "Australia is a vast and diverse continent with unique flora and fauna, stunning natural landscapes, and a rich cultural heritage.",
    location: {
      lat: -21.0160213,
      lng: 95.1370107,
    },
    address: "Next to New Zealand",
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "South Africa",
    description:
      "South Africa is a vast and diverse continent with unique flora and fauna, stunning natural landscapes, and a rich cultural heritage.",
    location: {
      lat: -33.2359591,
      lng: 9.0968524,
    },
    address: "Next to England",
    creatorId: "u2",
  },
];

router.get("/:pid", (req, res, next) => {
  const place = DUMMY_PLACES.find((currPlace) => {
    return currPlace.id === req.params.pid;
  });
  if (!place) {
    const error = new Error("Could not find a place with the provided id");
    error.code = 404;
    return next(error);
  }
  res.json({ message: place });
});

router.get("/user/:uid", (req, res, next) => {
  const creator = DUMMY_PLACES.find((currPlace) => {
    return currPlace.creatorId === req.params.uid;
  });
  if (!creator) {
    const error = new Error("Could not find a place with the provided user id");
    error.code = 404;
    return next(error);
  }
  res.json({ message: creator });
});

module.exports = router;
