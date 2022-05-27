import React from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import { register, authorize, getContent } from "../auth";
import { InfoTooltip } from "./InfoTooltip";
import { setToken, getToken, removeToken } from "../utils/token";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(""); //Users personal data
  const [isInfoTooltipSucceed, setIsInfoTooltipSucceed] = React.useState({
    isOpen: false,
    isSucceed: false,
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [plannedToDeleteCard, setPlannedToDeleteCard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({}); //Users open data: name, job, photo
  const [cards, setCards] = React.useState([]);
  const navigate = useNavigate();

  // Setting up token operation
  const handleLoggedIn = () => {
    setLoggedIn(true);
  };

  const checkAuth = (token) => {
    getContent(token)
      .then((data) => {
        if (data.data) {
          setUserEmail(data.data.email);
          handleLoggedIn();
          navigate("/");
        }
      })
      .catch((err) => console.log(`Пользователь не авторизован ${err}`));
  };
  const tokenCheck = () => {
    const jwt = getToken();
    if (jwt) {
      checkAuth(jwt);
    } else {
      navigate("/sign-in");
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  //Users' registration
  const handleRegister = (password, email) => {
    register(password, email)
      .then((res) => {
        if (res) {
          navigate("/sign-in");

          setIsInfoTooltipSucceed({
            isOpen: true,
            isSucceed: true,
          });
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации ${err}`);
        setIsInfoTooltipSucceed({
          isOpen: true,
          isSucceed: false,
        });
      });
  };

  //Users' login
  const handleLogin = (password, email) => {
    authorize(password, email)
      .then((res) => {
        if (res) {
          setToken(res.token);
          checkAuth(res.token);
        }
      })
      .catch((err) => {
        console.log(`Ошибка авторизации ${err}`);
        setIsInfoTooltipSucceed({
          isOpen: true,
          isSucceed: false,
        });
      });
  };

  //Users' sign out
  const signOut = () => {
    removeToken();
    setUserEmail("");
    setLoggedIn(false);
  };

  //Fetch user info and cards array request
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`Данные пользователя не загрузились: ${err}`);
        });

      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(`Карточки не загрузились: ${err}`);
        });
    }
  }, [loggedIn]);

  //Handle states for popups interactions
  const handleEditProfilePopup = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlacePopup = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarPopup = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteCardPopup = (card) => {
    setIsDeleteCardPopupOpen(true);
    setPlannedToDeleteCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setPlannedToDeleteCard({});
    setIsInfoTooltipSucceed({
      ...isInfoTooltipSucceed,
      isOpen: false,
    });
  };

  //fetch update users' info request
  const handleUpdateUser = (onUpdateUser) => {
    api
      .updateUserInfo(onUpdateUser)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Данные пользователя не обновились: ${err}`);
      });
  };

  const handleUpdateAvatar = (onUpdateAvatar) => {
    api
      .updateAvatar(onUpdateAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Фото пользователя не обновилось: ${err}`);
      });
  };

  //fetch request to add card
  const handleAddPlaceSubmit = (onAddPlace) => {
    api
      .postCard(onAddPlace)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Не удалось добавить карточку: ${err}`);
      });
  };

  //fetch request to like / dislike cards
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Клик не сработал: ${err}`);
      });
  };

  //fetch request to delete card
  const handleCardDeleteSubmit = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Карточка не удалилась: ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <>
                    <Header loggedIn={loggedIn} email={userEmail} onSignOut={signOut} />
                    <Main
                      onEditProfile={handleEditProfilePopup}
                      onAddPlace={handleAddPlacePopup}
                      onEditAvatar={handleEditAvatarPopup}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeleteCardPopup}
                    />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header>
                    <Link className="header__link" to="/sign-up">
                      Регистрация
                    </Link>
                  </Header>
                  <Login onLogin={handleLogin} />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header>
                    <Link className="header__link" to="/sign-in">
                      Войти
                    </Link>
                  </Header>
                  <Register onRegister={handleRegister} />
                </>
              }
            />
          </Routes>
        </main>

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipSucceed.isOpen}
          isSucceed={isInfoTooltipSucceed.isSucceed}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDeleteSubmit}
          card={plannedToDeleteCard}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
