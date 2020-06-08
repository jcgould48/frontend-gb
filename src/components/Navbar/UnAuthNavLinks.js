import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
export default function UnAuthNavLinks() {
  return (
    <ul className="nav__ul">
      <li>
        <NavLink
          to="/sign-up"
          className="navbar"
          activeStyle={{ fontWeight: "bold" }}
          activeClassName="selected"
        >
          Sign up
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sign-in"
          className="navbar "
          activeStyle={{ fontWeight: "bold" }}
          activeClassName="selected"
        >
          Sign in
        </NavLink>
      </li>
    </ul>
  );
}
