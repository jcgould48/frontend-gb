import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AuthNavLinks from "./AuthNavLinks";
import UnAuthNavLinks from "./UnAuthNavLinks";
//import EditUser from '../EditUser/EditUser'
import { isAuthenticated, setUserAuth } from "../Helpers/AuthHelpers";

import "./Navbar.css";

import { Consumer } from "../Context/Context";

export default class Navbar extends Component {

  componentDidMount() {
    let jwtToken = isAuthenticated();
    console.log(jwtToken);
    
    if (jwtToken) {
      setUserAuth(jwtToken, this.props.dispatch);
    }
  }

  render() {
    return (
      <div>
      <Consumer>
        {(stateOfContext) => {
          const {
            isAuth: { user, auth },
          } = stateOfContext;

          return (
            <header>
              <NavLink
                to="/waitroom"
                className="navbar-home"
                activeStyle={{ fontWeight: "bold" }}
                activeClassName="selected"
                exact
              >
                Waitroom
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

      <div className="line"></div>
      <div className="leather"></div>
      </div>
    );
  }
}
