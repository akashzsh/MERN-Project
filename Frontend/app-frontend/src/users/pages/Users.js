import React from "react";
import { UsersList } from "../components/UsersList";

export default function Users() {
  const USERS = [
    {
      id: 1,
      name: "Akash",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      places: "Kurla",
    },
    {
      id: 2,
      name: "Aman",
      image:
        "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg",
      places: "Banaras",
    },
    {
      id: 3,
      name: "Aaditya",
      image:
        "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__480.jpg",
      places: "Karjat",
    },
  ];

  return <UsersList items={USERS} />;
}