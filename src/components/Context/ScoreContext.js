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

    case "UPDATED_SCORE":
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

export class ExpenseProvider extends Component {
  state = {
    expenseArray: [],
    expenseDispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  async componentDidMount() {
    try {
      let results = await getScores();

      this.state.expenseDispatch({
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
