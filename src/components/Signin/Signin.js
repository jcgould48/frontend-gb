import React, { Component } from 'react'
import validator from 'validator'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from '../shared/InputGroup'
import ButtonGroup from '../shared/ButtonGroup'
import {loginUser,isAuthenticated} from '../Helpers/AuthHelpers'
import {Consumer} from '../Context/Context'
import './Signin.css'

export default class SignIn extends Component {
    state={
        canSubmit:true,
        formSetting:{
            email:{
                name:'email',
                placeholder:'enter email',
                value:'',
                error:{
                    message:'',
                    noError:null
                }
            },
            password:{
                name:'password',
                placeholder:'enter password',
                value:'',
                error:{
                    message:'',
                    noError:null
                }
            }
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
            passwordError: {
            noError: null,
            message: "",
            },
        },
    };
    componentDidMount(){
      if(isAuthenticated()){
        this.props.history.push('/')
      }
    }
    checkInputValidation=(errorState,inputName,inputValue)=>{
        switch (inputName) {
            case 'email':
                let validatedEmail = validator.isEmail(inputValue)
                if(!validatedEmail){
                    errorState.emailError.noError = validatedEmail
                    errorState.emailError.message = "improper credentials"
                    return errorState
                }else{
                    errorState.emailError.noError = validatedEmail
                    errorState.emailError.message = ""
                    return errorState
                }
                
            case 'password':
                let validatedPassword = true
                //let validatedPassword = validator.matches(inputValue,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,32}$")
                if(!validatedPassword){
                    errorState.passwordError.noError= validatedPassword
                    errorState.passwordError.message="must contain 1 uppercase,1 special character,1 number"
                    return errorState
                }else{
                    errorState.passwordError.noError=validatedPassword
                    errorState.passwordError.message=''
                    return errorState

                }
        
            default:
                return errorState
        }
    };

    onChange= (event)=>{
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
        inputForm["password"].error = isValidatedCheck.passwordError;

        if(inputForm['email'].error.noError === false || inputForm['password'].error.noError===false){
            this.setState({
                canSubmit:true
            })
            return;
            }
            if(inputForm['password'].error.noError=== true&&inputForm['email'].error.noError===true){
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
    onSubmit=async(e,dispatch)=>{
        e.preventDefault()
        const {email,password} = this.state.formSetting

        try {
            let success =await loginUser({
                email:email.value,
                password:password.value
            })
            
            let inputForm = {
                ...this.state.formSetting
            }
            inputForm['email'].value=''
            inputForm['password'].value=''
            //console.log(dispatch);
            console.log(success);
            
            dispatch({
                type:"SUCCESS_SIGNED_IN",
                payload:success.user
            })

            toast.success('Logged in',{
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
                this.props.history.push('/wait-room')


        } catch (error) {
            toast.error(error.message, {
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


    render() {
        const { canSubmit, formSetting } = this.state;
        let inputArray = [];
        for (let key in formSetting) {
          inputArray.push({
            formSetting: formSetting[key],
          });
        }
        return (
          <Consumer>
            {({dispatch}) => {
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
                  <div>Sign in</div>
                  <form className="signup-form" onSubmit={(e)=>this.onSubmit(e,dispatch)}>
                    {inputArray.map((element) => {
                      const {
                        formSetting: { name, placeholder, value, error },
                      } = element;
                      console.log(error);
                      
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
                      title="sign in"
                      disabled={canSubmit}
                    />
                  </form>
                </div>
              );
            }}
          </Consumer>
        );
      }
    }
    
