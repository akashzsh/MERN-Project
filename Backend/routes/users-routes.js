const express = require("express");

const router = express.Router();

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Akash",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    places: "4",
  },
  {
    id: "u2",
    name: "Aman",
    image:
      "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg",
    places: "2",
  },
  {
    id: "u3",
    name: "Aaditya",
    image:
      "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__480.jpg",
    places: "1",
  },
];

router.get("/:uid", (req, res, next) => {
  const user = DUMMY_USERS.find((currUser) => {
    return currUser.id === req.params.uid;
  });
  res.json({ data: user });
});

module.exports = router;
