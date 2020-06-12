import React, { Component } from "react";
import { updateScore } from "../Helpers/Api";
export const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS_SIGNED_IN":
      console.log(action);
      
      return {
        ...state,
        isAuth:{
          user:action.payload,
          auth:true
        },
      };
      case "SUCCESS_SIGNED_OUT":
      return{
        ...state,
        isAuth:{
          user:null,
          auth:false
        }
      }

      case "SUCCESS_UPDATE_USER":
        return {
          ...state,
          isAuth:{
            user:action.payload,
            auth:true
          },
        }

        case "DELETED_USER":
      return{
        ...state,
        isAuth:{
          user:null,
          auth:false
        }
      }

      case "POPULATE_SCORE":
      return{
        ...state,
        formSetting: action.payload
      }
    default:
      return state;
  }
};
export  class Provider extends Component {
  state = {
    isAuth: {
      user: null,
      auth: false,
    },
    formSetting:{
      wins:0,
      losses:0
    },
    
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
    handleP1Winner: (id,score)=>{
   this.p1WinnerInfo(id,score)
  },
  handleP2Winner: (id,score)=>{
 this.p1WinnerInfo(id,score)
}
  };
  p1WinnerInfo = async (id,score) =>{
    try{
        // let userID = this.context.isAuth.user._id
        
        console.log("totalScoROE wins", score)
        let updatedResults = await updateScore(id,score)
        console.log("these are the updated results" , updatedResults)
        return updatedResults
    } catch (e) {
          console.log(e);
      }
}
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer
