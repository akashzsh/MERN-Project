import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  return (
    <div>
      <div>
        <MainNavigation />
      </div>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
