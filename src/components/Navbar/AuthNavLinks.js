import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import { Context } from "../Context/Context";
import { logout } from "../Helpers/AuthHelpers";

import "./Navbar.css";

class AuthNavLinks extends Component {
  static contextType = Context;

  logout = async () => {
    try {
      await logout();

      this.context.dispatch({
        type: "SUCCESS_SIGNED_OUT",
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <ul className="nav__ul">
        <li>
          <NavLink
            to="/user-profile"
            className="navbar"
            activeStyle={{ fontWeight: "bold" }}
            activeClassName="selected"
          >
            {this.props.username}
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="navbar" onClick={this.logout}>
            logout
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default AuthNavLinks;
