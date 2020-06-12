import React, { Component } from "react";
import { getScores, updateScore } from "../Helpers/Api";


export const ScoreContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_SCORES":
      return {
        ...state,
        scoreArray: [...action.payload],
      };

    //   case "RESET_SCORE":
    //     state.expenseArray.forEach((item, index) => {
    //       if (item._id === action.payload._id) {
    //         state.expenseArray.splice(index, 1, action.payload);
    //       }
    //     });
    //     return {
    //       ...state,
    //       expenseArray: [...state.expenseArray],
    //     };

    // case "UPDATE_SCORE":
    //   state.expenseArray.forEach((item, index) => {
    //     if (item._id === action.payload._id) {
    //       state.expenseArray.splice(index, 1, action.payload);
    //     }
    //   });
    //   return {
    //     ...state,
    //     expenseArray: [...state.expenseArray],
    //   };
    default:
      return state;
  }
};

export class ScoreProvider extends Component {
  state = {
        // wins,
        // losses,
        // owner,

    scoreDispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
    handleP1Winner: (score)=>{
        console.log(score)
     this.p1WinnerInfo(score)
    }
  };


//This is Where I need tpo import id but how?
  async componentDidMount() {
    // try {
    //     console.log("dododoododododo")
    //   let results = await getScores();
    //   console.log('22222', results)
    //   this.state.scoreDispatch({
    //     type: "GET_SCORES",
    //     payload: results.scores, //check this
    //   });
     
    // } catch (e) {
    //   console.log(e);
    // }
  }

  p1WinnerInfo = async (score) =>{
    try{
        // let userID = this.context.isAuth.user._id
        let totalWins =  score
        let updatedResults = await updateScore(totalWins)
        console.log("these are the updated results" , updatedResults)
    } catch (e) {
          console.log(e);
      }
}

  render() {
    return (
      <ScoreContext.Provider value={this.state} >
        {this.props.children}
      </ScoreContext.Provider>
    );
  }
}

export const ScoreConsumer = ScoreContext.Consumer;
