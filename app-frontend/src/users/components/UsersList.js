import React from "react";
import { UserItem } from "./UserItem";
import "./UsersList.css";
import Card from "../../shared/components/UIElements/Card";

export const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user._id}
            id={user._id}
            name={user.name}
            image={user.image}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};
