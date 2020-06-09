import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../Helpers/AuthHelpers";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
}

export default PrivateRoute;
