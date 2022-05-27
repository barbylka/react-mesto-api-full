import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `places__delete ${
    !isOwn && "places__delete_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `places__like ${
    isLiked && "places__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="places__item">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <img
        className="places__img"
        alt="фото, которое загрузил пользователь"
        src={card.link}
        onClick={handleClick}
      />
      <div className="places__description">
        <h2 className="places__title">{card.name}</h2>
        <div className="places__likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <span className="places__like-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
