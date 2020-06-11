import React, { Component } from "react";
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
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer
