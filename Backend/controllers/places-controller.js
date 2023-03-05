const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  const place = DUMMY_PLACES.find((currPlace) => {
    return currPlace.id === req.params.pid;
  });
  if (!place) {
    return next(
      new HttpError("Could not find a place with the provided id", 404)
    );
  }
  res.json({ message: place });
};

const getPlaceByUserId = (req, res, next) => {
  const creator = DUMMY_PLACES.find((currPlace) => {
    return currPlace.creatorId === req.params.uid;
  });
  if (!creator) {
    return next(
      new HttpError("Could not find a place with the provided user id", 404)
    );
  }
  res.json({ message: creator });
};

const createPlace = (req, res, next) => {
  const newPlace = req.body;
  DUMMY_PLACES.push(newPlace);
  res.status(201).json({ DUMMY_PLACES });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = {
    ...DUMMY_PLACES.find((currPlace) => currPlace.id === placeId),
  };

  const placeIndex = DUMMY_PLACES.findIndex(
    (currPlace) => currPlace.id == placeId
  );
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json(updatedPlace);
};

const deletePlace = (req, res, next) => {};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
