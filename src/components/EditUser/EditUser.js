import React, { Component } from 'react'
import validator from "validator";

import { Context } from "../Context/Context"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import InputGroup from '../shared/InputGroup'
import ButtonGroup from '../shared/ButtonGroup'
import {editUser,deleteUser} from '../Helpers/AuthHelpers'
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

    onChange = (event)=>{
        let inputForm = {
            ...this.state.formSetting,
            };
        console.log(inputForm)
        
        inputForm[event.target.name].value = event.target.value;
        
        let isValidatedCheck = this.checkInputValidation(
            this.state.validate,
            event.target.name,
            event.target.value
        );
        inputForm["email"].error = isValidatedCheck.emailError;
        inputForm["username"].error = isValidatedCheck.usernameError;
        
        
        if(inputForm['email'].error.noError === false ||inputForm['username'].error.noError===false){
            this.setState({
                canSubmit:true
            })
            return;
            }
            if(inputForm["username"].error.noError===true&&inputForm['email'].error.noError===true){
                this.setState({
                canSubmit:false
                })
                return;
            }else{
            this.setState({
                ...this.state,
                formSetting: inputForm,
                })
            }
    };

    onSubmit = async(e) => {
        e.preventDefault();
    
        let userID = this.context.isAuth.user._id
        const {email,username,city,state}=this.state.formSetting

        try {
        let editObj = {
            email:email.value,
            username:username.value,
            city:city.value,
            state:state.value
        }
    
            let success = await editUser(userID,editObj)
            console.log(success);

            this.context.dispatch({
                type:"SUCCESS_UPDATE_USER",
                payload:success
            })
            
    
            let inputForm={
                ...this.state.formSetting
            }
    
            inputForm['email'].value=''
            inputForm['username'].value=''
    
            toast.success('Updated User',{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    
            this.setState({
            ...this.state,
            formSetting: inputForm,
            });
        } catch (error) {
            toast.error(e.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
            };
    
    handleDeleteUser=async(e)=>{
        e.preventDefault()
        let userID = this.context.isAuth.user._id
        try {
           let success= await deleteUser(userID)
            this.context.dispatch({
                type:"DELETED_USER",
                payload:success
            })
            toast.success('deleted',{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            this.history.push('/')
        } catch (error) {
            toast.error(e.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }


    
    // constructor(props){
        //     super(props)
        // }
        
        componentDidMount(){
            
            console.log(this.context.isAuth.user._id);
            
        }
        render() {
            const { formSetting,canSubmit } = this.state;
            //loop through the formSetting object
            let inputArray = [];
            for (let key in formSetting) {
            inputArray.push({
            formSetting: formSetting[key],
            });
             }
            return (
                <div className="signup-container">
                    <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    <h1>Edit {this.context.isAuth.user.username}</h1>
                    <form onSubmit={this.onSubmit}>
                        {inputArray.map((element) => {
                            const {
                                formSetting: { name, placeholder, value, error },
                                } = element;
                                return (
                                    <InputGroup
                                    key={name}
                                    name={name}
                                    placeholder={placeholder}
                                    onChange={this.onChange}
                                    value={value}
                                    error={error}
                                    type={name}
                                    />
                                );
                            })}
                        <ButtonGroup
                        buttonStyle="form-button"
                        disabled={canSubmit}
                        title='Submit Edit'
                        />
                        <ButtonGroup
                        buttonStyle="form-button"
                        disabled={false}
                        onClick={this.handleDeleteUser}
                        title='Delete Account'
                        />
        </form>
        </div>
        )
    }
}

