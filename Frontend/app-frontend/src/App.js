import React from "react";
import { Routes, Route } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./users/pages/Users";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/places/new" element={<NewPlace />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
