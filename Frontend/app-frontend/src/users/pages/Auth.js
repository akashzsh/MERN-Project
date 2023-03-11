import React, { useContext, useState } from "react";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./Auth.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import axios from "axios";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    if (isLoginMode) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        auth.login();
      } catch (error) {
        setLoading(false);
        setError(
          error.response.data.message ||
            "Something went wrong. Please try again."
        );
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/signup",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setLoading(false);
        auth.login();
      } catch (error) {
        setLoading(false);
        setError(
          error.response.data.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode)
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    else
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    setIsLoginMode((prevMode) => !prevMode);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {loading && <LoadingSpinner asOverlay={true} />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={placeSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            label="Email"
            type="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            label="Password"
            type="password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password (atleast 5 characters)"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {!isLoginMode ? "LOGIN" : "SIGN UP"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
