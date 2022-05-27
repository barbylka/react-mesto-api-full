import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <button className="popup__save-button" type="submit">
        Удалить
      </button>
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
