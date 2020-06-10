import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";
import { Provider } from "./components/Context/Context";
import { ScoreProvider } from "./components/Context/ScoreContext";
//import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends Component {

  render() {
    return (
      <Provider>
        <ScoreProvider>
          <Router>
            <React.Suspense fallback={<Spinner />}>
              <MainRouter />
            </React.Suspense>
          </Router>
        </ScoreProvider>
      </Provider>
    );
  }
}