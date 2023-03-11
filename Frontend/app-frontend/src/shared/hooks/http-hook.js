import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

const useHttpClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "get", body = null, headers = {}) => {
      setLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await axios({
          method: method,
          url: url,
          data: body,
          headers: headers,
          signal: httpAbortController.signal,
        });

        return response.data;
      } catch (error) {
        setError(error.response.data.message);
      }
      setLoading(false);
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { loading, error, sendRequest, clearError };
};

export default useHttpClient;
