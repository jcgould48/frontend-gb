import React, { Component } from 'react'
import validator from "validator";

import { Context } from "../Context/Context"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import InputGroup from '../shared/InputGroup'
import {editUser} from '../Helpers/AuthHelpers'
export default class EditUser extends Component {
    static contextType = Context;
    state={
        canSubmit: true,
        formSetting: {
            username: {
                name: "username",
                placeholder: "Enter username",
                value: "",
                error: {
                    message: "",
                    noError: null,
                },
            },
            email: {
                name: "email",
                placeholder: "Enter email",
                value: "",
                error: {
                    message: "",
                    noError: null,
                },
            },
            city: {
                name: "city",
                placeholder: "Enter city",
                value: "",
                error: {
                    message: "",
                    noError: null,
                },
            },
            state: {
                name: "state",
                placeholder: "Enter state",
                value: "",
                error: {
                    message: "",
                    noError: null,
                },
            },
    },
        validate: {
            usernameError: {
                noError: null,
                message: "",
                },
            emailError: {
                noError: null,
                message: "",
            },
            cityError: {
                noError: null,
                message: "",
            },
            stateError: {
                noError: null,
                message: "",
            },
        },
    };

    checkInputValidation = (errorState, inputName, inputValue) => {
        switch (inputName) {
            case "username":
    
            let validatedUsername;
            validatedUsername = validator.matches(
                inputValue,
                /^[a-zA-Z0-9]{1,20}$/
            );
    
            if (!validatedUsername) {
                errorState.usernameError.noError = validatedUsername;
                errorState.usernameError.message =
                "Cannot contain special characters and minimum of 2 and maximum of 20 characters";
                return errorState;
            } else {
                errorState.usernameError.noError = validatedUsername;
                errorState.usernameError.message = "";
                return errorState;
            }
    
            case "email":
            let validatedEmail;
    
            validatedEmail = validator.isEmail(inputValue);
    
            if (!validatedEmail) {
                errorState.emailError.noError = validatedEmail;
                errorState.emailError.message = "It must be an email";
                return errorState;
            } else {
                errorState.emailError.noError = validatedEmail;
                errorState.emailError.message = "";
                return errorState;
            }
        
            case "state":
    
            let validatedState;
            validatedState = validator.isAlpha(inputValue);
    
            if (!validatedState) {
                errorState.stateError.noError = validatedState;
                errorState.stateError.message =
                "Cannot contain special characters and minimum of 2 and maximum of 20 characters";
                return errorState;
            } else {
                errorState.stateError.noError = validatedState;
                errorState.stateError.message = "";
                return errorState;
            }
    
            case "city":
    
            let validatedCity;
            validatedCity = validator.isAlpha(inputValue);
    
            if (!validatedCity) {
                errorState.cityError.noError = validatedCity;
                errorState.cityError.message =
                "Cannot contain special characters and minimum of 2 and maximum of 20 characters";
                return errorState;
            } else {
                errorState.cityError.noError = validatedCity;
                errorState.cityError.message = "";
                return errorState;
            }
    
    
            default:
            return errorState;
        }
    };
    
    // constructor(props){
        //     super(props)
        // }
        
        componentDidMount(){
            
            console.log(this.context.isAuth.user._id);
            
        }
        render() {
            return (
                <div>
                {this.props.username}
            </div>
        )
    }
}

