import React from "react";

import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

const Auth = () => {
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

  const placeSubmitHandler = () => {
    console.log("SUBMIT");
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="email"
        element="input"
        label="Email"
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
        errorText="Please enter a valid password"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default Auth;
