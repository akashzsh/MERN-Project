import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink end to="/">
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <React.Fragment>
          <li>
            <NavLink to="/u1/places">MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">ADD PLACES</NavLink>
          </li>
        </React.Fragment>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">LOGIN</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
