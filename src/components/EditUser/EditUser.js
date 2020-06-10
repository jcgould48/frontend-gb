import React, { Component } from "react";
import validator from "validator";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "./Signup.css";
import InputGroup from "../shared/InputGroup";
import ButtonGroup from "../shared/ButtonGroup";

import { editUser } from "../Helpers/AuthHelpers";

import { isAuthenticated } from "../Helpers/AuthHelpers";

export default class Signup extends Component {
  state = {
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
      password: {
        name: "password",
        placeholder: "Enter password",
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
      passwordError: {
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

  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.push("/");
    }
  }

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
    //   case "password":
    //     let validatedPassword = true;
    //     //let validatedPassword
    //     // validatedPassword = validator.matches(
    //     //   inputValue,
    //     //   "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    //     // );

    //     if (!validatedPassword) {
    //       errorState.passwordError.noError = validatedPassword;
    //       errorState.passwordError.message =
    //         "Minimum eight characters, at least one letter, one number and one special character";
    //       return errorState;
    //     } else {
    //       errorState.passwordError.noError = validatedPassword;
    //       errorState.passwordError.message = "";
    //       return errorState;
    //     }
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

  onChange = (event) => {
    let inputForm = {
      ...this.state.formSetting,
    };

    inputForm[event.target.name].value = event.target.value;

    let isValidatedCheck = this.checkInputValidation(
      this.state.validate,
      event.target.name,
      event.target.value
    );

    inputForm["username"].error = isValidatedCheck.usernameError;
    inputForm["email"].error = isValidatedCheck.emailError;
    //inputForm["password"].error = isValidatedCheck.passwordError;
    inputForm["state"].error = isValidatedCheck.stateError;
    inputForm["city"].error = isValidatedCheck.cityError;

    if (
      inputForm["email"].error.noError === false ||
      //inputForm["password"].error.noError === false ||
      inputForm["username"].error.noError === false ||
      inputForm["state"].error.noError === false ||
      inputForm["city"].error.noError === false
    ) {
      this.setState({
        canSubmit: true,
      });
      return;
    }

    if (
      inputForm["email"].error.noError === true &&
      //inputForm["password"].error.noError === true &&
      inputForm["username"].error.noError === true &&
      inputForm["state"].error.noError === true &&
      inputForm["city"].error.noError === true
    ) {
      this.setState({
        canSubmit: false,
      });
      return;
    } else {
      this.setState({
        ...this.state,
        formSetting: inputForm,
      });
      return;
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const { email, password, username, state, city } = this.state.formSetting;

    try {
      await editUser({
        email: email.value,
        password: password.value,
        username: username.value,
        state: state.value,
        city: city.value,
      });

      let inputForm = {
        ...this.state.formSetting,
      };

      inputForm["email"].value = "";
      inputForm["password"].value = "";
      inputForm["username"].value = "";
      inputForm["state"].value = "";
      inputForm["city"].value = "";

      toast.success(`Login now!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      this.setState({
        ...this.state,
        formSetting: inputForm,
      });
    } catch (e) {
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

  render() {
    const { formSetting, canSubmit } = this.state;
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
        <h1>Sign up</h1>
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
            title="Sign up"
            disabled={canSubmit}
          />
        </form>
      </div>
    );
  }
}
