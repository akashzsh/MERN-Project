import axios from "axios";
import React, { useEffect, useState } from "react";
import { UsersList } from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setLoadedUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "Unknown Error Occurred");
      console.log(error.response.data.message || "Unknown Error Occurred");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
}
