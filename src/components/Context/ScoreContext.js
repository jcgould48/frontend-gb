import React, { Component } from "react";
import { getScores } from "../Helpers/Api";

export const ScoreContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_SCORES":
      return {
        ...state,
        expenseArray: [...action.payload],
      };

      case "RESET_SCORE":
        state.expenseArray.forEach((item, index) => {
          if (item._id === action.payload._id) {
            state.expenseArray.splice(index, 1, action.payload);
          }
        });
        return {
          ...state,
          expenseArray: [...state.expenseArray],
        };

    case "UPDATE_SCORE":
      state.expenseArray.forEach((item, index) => {
        if (item._id === action.payload._id) {
          state.expenseArray.splice(index, 1, action.payload);
        }
      });
      return {
        ...state,
        expenseArray: [...state.expenseArray],
      };
    default:
      return state;
  }
};

export class ScoreProvider extends Component {
  state = {
    scoreArray: [],
    scoreDispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  async componentDidMount() {
    try {
      let results = await getScores();
      console.log('22222', results)
      this.state.scoreDispatch({
        type: "GET_SCORES",
        payload: results.scores, //check this
      });
     
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <ScoreContext.Provider value={this.state}>
        {this.props.children}
      </ScoreContext.Provider>
    );
  }
}

export const ScoreConsumer = ScoreContext.Consumer;
