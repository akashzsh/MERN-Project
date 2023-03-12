import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const userId = useParams().userId;
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { clearError, loading, error, sendRequest } = useHttpClient();

  async function getPlaces() {
    try {
      const response = await sendRequest(
        `http://localhost:5000/api/places/user/${userId}`
      );
      setLoadedPlaces(response.place);
    } catch (error) {}
  }

  useEffect(() => {
    getPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </React.Fragment>
  );
};

export default UserPlaces;
