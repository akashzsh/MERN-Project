import React, { useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";

export default function NewPlace() {
  const auth = useContext(AuthContext);
  const { clearError, error, loading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("image", formState.inputs.image.value);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        "post",
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {loading && <LoadingSpinner asOverlay={true} />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          errorText="Please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (atleast 5 characters)"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
}
