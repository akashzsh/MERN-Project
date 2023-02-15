import React from "react";
import { UserItem } from "./UserItem";
import "./UsersList.css";

export const UsersList = (props) => {
  console.log(props);

  if (props.items.length === 0) {
    return <h2>No Users found</h2>;
  }

  return (
    <ul>
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            image={user.image}
            placeCount={user.places}
          />
        );
      })}
    </ul>
  );
};
