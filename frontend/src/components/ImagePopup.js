import React from "react";
import { Popup } from "./Popup";

function ImagePopup({ card, onClose }) {
  const [isImageOpened, setIsImageOpened] = React.useState(false);
  const popupClassName = `popup popup_type_pic ${isImageOpened && "popup_opened"}`;

  React.useEffect(() => {
    if (card.link) {
      setIsImageOpened(true);
    } else {
      setIsImageOpened(false);
    }
  }, [card.link]);

  return (
    <Popup isOpen={isImageOpened} onClose={onClose} sectionClassName={popupClassName}>
      <div className="popup__pic-box">
        <button className="popup__exit-button" type="button" onClick={onClose}></button>
        <img className="popup__img" alt="полная версия выбранного фото" src={card.link} />
        <h2 className="popup__pic-title">{card.name}</h2>
      </div>
    </Popup>
  );
}

export default ImagePopup;
