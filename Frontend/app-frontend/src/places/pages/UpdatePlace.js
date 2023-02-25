import React from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Australia",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/06/06/09/36/sydney-opera-house-363244__480.jpg",
    description:
      "Australia is a vast and diverse continent with unique flora and fauna, stunning natural landscapes, and a rich cultural heritage.",
    address: "Next to New Zealand",
    creatorId: "u1",
    coordinates: {
      lat: -21.0160213,
      lng: 95.1370107,
    },
  },
  {
    id: "p2",
    title: "South Africa",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/05/19/18/51/lion-2327225__480.jpg",
    description:
      "South Africa is a vast and diverse continent with unique flora and fauna, stunning natural landscapes, and a rich cultural heritage.",
    address: "Next to England",
    creatorId: "u2",
    coordinates: {
      lat: -33.2359591,
      lng: 9.0968524,
    },
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!identifiedPlace)
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characters required)"
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
