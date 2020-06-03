import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";

export default class App extends Component {
  // componentDidMount() {
  //   console.log(document.cookie);
  // }

  render() {
    return (

        <Router>
          <React.Suspense fallback={<Spinner />}>
            <MainRouter />
          </React.Suspense>
        </Router>
       
    );
  }
}