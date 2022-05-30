import React from "react";

export const useValidation = (valid) => {
  const [isWrong, setIsWrong] = React.useState(valid);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onBlur = (evt) => {
    if (!evt.target.validity.valid) {
      setIsWrong(true);
      setErrorMessage(evt.target.validationMessage);
    } else {
      setIsWrong(false);
      setErrorMessage("");
    }
  };

  return {
    isWrong,
    errorMessage,
    onBlur,
  };
};
