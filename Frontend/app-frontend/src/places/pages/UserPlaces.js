import React from "react";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
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

  return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
