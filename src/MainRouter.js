import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Consumer } from "./components/Context/Context";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import Navbar from "./components/Navbar/Navbar";

const Home = React.lazy(() => import("./components/Home/Home"));
const Signin = React.lazy(() => import("./components/Signin/Signin"));
const Signup = React.lazy(() => import("./components/Signup/Signup"));
const EditUser = React.lazy(()=>import("./components/EditUser/EditUser"))
const WaitRoom = React.lazy(() => import("./components/WaitRoom/WaitRoom"));
const Beersweeper = React.lazy(() => import("./components/BeerSweeper/Minesweeper"));
const Game = React.lazy(()=>import("./components/Tic-Tac-Toe/Game/Game"))

export default class MainRouter extends Component {
  render() {
    return (
      <Consumer>
      {({ dispatch }) => {
        return (
          <>
          <Navbar dispatch={dispatch}/>

          <Switch>
            <Route exact path="/sign-up" component={Signup} />
            <Route exact path="/sign-in" component={Signin} />
            <Route exact path="/wait-room" component={WaitRoom} />
            <Route exact path="/beersweeper" component={Beersweeper} />
            <Route exact path="/tictactoe" component={Game}/>
            <Route exact path="/edit-user" component={EditUser}/>
            <Route exact path="/" component={Home} />
           
            {/* <PrivateRoute exact path="/wait-room" component={WaitRoom} /> */}
            
          </Switch>
        </>
        )
      }}
      </Consumer>  
           
          );
  }
}
