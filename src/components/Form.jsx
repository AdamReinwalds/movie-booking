import React, { useState } from "react";
import Button from "./Button";

const Form = ({ selectedMovieName, totalPrice, toggleForm, handleSubmit }) => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  function handleInput(key, value) {
    setInputData({
      ...inputData,
      [key]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: "",
    }));
  }

  function formValidation() {
    let isValid = true;
    const newErrors = {};

    if (!inputData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!inputData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!inputData.email.includes("@")) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }

  function handleFormSubmit() {
    if (formValidation()) {
      handleSubmit(inputData);
    }
  }

  return (
    <form action="" id="form">
      <div className="form__text-container">
        <h3>Booking Page</h3>
        <p id="form__text-container__movie-name">{selectedMovieName}</p>
        <p id="form__text-container__total-price">
          Total Price: {totalPrice}kr
        </p>
      </div>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        onChange={(e) => {
          handleInput("name", e.target.value);
        }}
      />
      {errors.name && <p>{errors.name}</p>}
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        onChange={(e) => {
          handleInput("email", e.target.value);
        }}
      />
      {errors.email && <p>{errors.email}</p>}
      <div className="form__button-container">
        <Button text="Cancel" onClick={toggleForm} />
        <Button
          text="Submit"
          onClick={() => {
            handleFormSubmit();
          }}
        />
      </div>
    </form>
  );
};

export default Form;
