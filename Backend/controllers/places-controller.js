const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Place = require("../models/place");

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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not find a place", 500));
  }

  if (!place) {
    return next(
      new HttpError("Could not find a place with the provided Id", 404)
    );
  }

  res.json({ place });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let place;
  try {
    place = await Place.find({ creatorId: userId });
  } catch (error) {
    return next(new HttpError("Could not find a place", 500));
  }

  if (!place || place.length === 0)
    return next(
      new HttpError("Could not find a place with the given user id", 404)
    );
  res.json({ place });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpError("Invalid request body", 422);

  const { title, description, address, creatorId } = req.body;

  const createdPlace = new Place({
    title,
    description,
    address,
    image:
      "https://images.unsplash.com/photo-1638272750685-81820148329b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    creatorId,
  });

  try {
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again", 500));
  }

  res.status(201).json({ createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpError("Invalid request body", 422);

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not update the place", 500));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(new HttpError("Something went wrong. Could not update.", 500));
  }

  res.json({ place });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Something went wrong. Could not delete", 500));
  }

  if (!place)
    return next(new HttpError("Could not find a place with the given id", 404));

  const result = await Place.deleteOne({ _id: placeId });

  res.json({ message: result });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
