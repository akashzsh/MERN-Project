import React from "react";
import { useState } from "react";

import MainHeader from "./MainHeader";
import Backdrop from "../UIElements/Backdrop";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
import "../UIElements/Backdrop";

const MainNavigation = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <Backdrop
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
      <SideDrawer
        show={open}
        onClick={() => {
          setOpen(false);
        }}
      >
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
