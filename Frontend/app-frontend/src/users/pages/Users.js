import React, { useEffect, useState } from "react";
import { UsersList } from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function Users() {
  const { loading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  const getUsers = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        "get"
      );
      setLoadedUsers(response.users);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
}
