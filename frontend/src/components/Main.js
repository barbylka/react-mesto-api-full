import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div
          className="profile__image"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__container">
          <div className="profile__cont-info">
            <h1 className="profile__cont-info-name">{currentUser.name}</h1>
            <p className="profile__cont-info-description">{currentUser.about}</p>
          </div>
          <button
            className="profile__button profile__button_type_edit"
            onClick={onEditProfile}
            type="button"
          ></button>
        </div>
        <button
          className="profile__button profile__button_type_add"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>

      <section className="places" aria-label="список картинок">
        <ul className="places__items">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default Main;
