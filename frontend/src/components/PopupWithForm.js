import React from "react";
import { Popup } from "./Popup";

const PopupWithForm = React.memo(({ name, isOpen, onClose, title, children, onSubmit }) => {
  const popupClassName = `popup popup_type_${name} ${isOpen && "popup_opened"}`;

  const formClassName = `popup__container popup__container_type_${name}`;

  return (
    <Popup isOpen={isOpen} onClose={onClose} sectionClassName={popupClassName}>
      <form className={formClassName} name={name} onSubmit={onSubmit} noValidate>
        <button className="popup__exit-button" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </form>
    </Popup>
  );
});

export default PopupWithForm;
