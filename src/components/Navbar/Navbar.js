import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AuthNavLinks from "./AuthNavLinks";
import UnAuthNavLinks from "./UnAuthNavLinks";
import { isAuthenticated, setUserAuth } from "../Helpers/AuthHelpers";

import "./Navbar.css";

import { Consumer } from "../Context/Context";

export default class Navbar extends Component {

  componentDidMount() {
    let jwtToken = isAuthenticated();

    if (jwtToken) {
      setUserAuth(jwtToken, this.props.dispatch);
    }
  }

  render() {
    return (
      <Consumer>
        {(stateOfContext) => {
          const {
            isAuth: { user, auth },
          } = stateOfContext;

          return (
            <header>
              <NavLink
                to="/"
                className="navbar-home"
                activeStyle={{ fontWeight: "bold" }}
                activeClassName="selected"
                exact
              >
                Home
              </NavLink>
              <nav>
                {user && auth ? (
                  <AuthNavLinks {...user} {...auth} />
                ) : (
                  <UnAuthNavLinks />
                )}
              </nav>
            </header>
          );
        }}
      </Consumer>
    );
  }
}
