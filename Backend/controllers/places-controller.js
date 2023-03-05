const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

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
    creatorId: "u1",
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

const getPlacesByUserId = (req, res, next) => {
  const placesByCreator = DUMMY_PLACES.filter((currPlace) => {
    return currPlace.creatorId === req.params.uid;
  });
  if (placesByCreator.length === 0) {
    return next(
      new HttpError("Could not find a place with the provided user id", 404)
    );
  }
  res.json(placesByCreator);
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpError("Invalid request body", 422);
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

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES.splice(placeId, 1);
  res.status(200).json({ data: DUMMY_PLACES });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
