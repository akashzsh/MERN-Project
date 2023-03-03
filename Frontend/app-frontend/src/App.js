import React, { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
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
    </AuthContext.Provider>
  );
}

export default App;
