import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../utils/validation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const nameValid = useValidation(true);
  const linkValid = useValidation(true);
  const saveButtonClassName = `popup__save-button 
  ${(nameValid.isWrong || linkValid.isWrong || (name === "") || (link === "")) && "popup__save-button_disabled"}`;

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__inputs">
        <label className="popup__field">
          <input
            type="text"
            id="place-input"
            required
            placeholder="Название"
            value={name}
            onChange={(e) => {
              handleChangeName(e);
              nameValid.onBlur(e);
            }}
            className="popup__text popup__text_type_place"
            name="name"
            minLength="2"
            maxLength="30"
          />
          <span className="popup__text-error place-input-error">
            {nameValid.isWrong && nameValid.errorMessage}
          </span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            id="link-input"
            required
            placeholder="Ссылка на картинку"
            value={link}
            onChange={(e) => {
              handleChangeLink(e);
              linkValid.onBlur(e);
            }}
            className="popup__text popup__text_type_link"
            name="link"
          />
          <span className="popup__text-error link-input-error">
            {linkValid.isWrong && linkValid.errorMessage}
          </span>
        </label>
      </fieldset>
      <button
        disabled={nameValid.isWrong || linkValid.isWrong || (name === "") || (link === "")}
        className={saveButtonClassName}
        type="submit"
      >
        Добавить
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
