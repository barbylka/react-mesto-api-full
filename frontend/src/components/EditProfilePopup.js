import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useValidation } from "../utils/validation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const nameValid = useValidation(false);
  const descriptionValid = useValidation(false);
  const saveButtonClassName = `popup__save-button
  ${(nameValid.isWrong || descriptionValid.isWrong || (name === currentUser.name && description === currentUser.about)) && "popup__save-button_disabled"}`;

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__inputs">
        <label className="popup__field">
          <input
            type="text"
            id="name-input"
            required
            placeholder="Имя"
            value={name || ""}
            onChange={(e) => {
              handleChangeName(e);
              nameValid.onBlur(e);
            }}
            className="popup__text popup__text_type_name"
            name="name"
            minLength="2"
            maxLength="40"
          />
          <span className="popup__text-error name-input-error">
            {nameValid.isWrong && nameValid.errorMessage || (name === currentUser.name && description === currentUser.about)}
          </span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            id="desc-input"
            required
            placeholder="О себе"
            value={description || ""}
            onChange={(e) => {
              handleChangeDescription(e);
              descriptionValid.onBlur(e);
            }}
            className="popup__text popup__text_type_description"
            name="about"
            minLength="2"
            maxLength="200"
          />
          <span className="popup__text-error desc-input-error">
            {descriptionValid.isWrong && descriptionValid.errorMessage}
          </span>
        </label>
      </fieldset>
      <button
        disabled={nameValid.isWrong || descriptionValid.isWrong}
        className={saveButtonClassName}
        type="submit"
      >
        Добавить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
