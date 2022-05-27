import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, email, onSignOut, children }) {
  const [isBurgerOpened, setIsBurgerOpened] = React.useState(false);

  const BurgerMenuClassName = `header__list ${isBurgerOpened && "header__list_opened"}`;
  const BurgerButtonClassName = `header__burger-button ${isBurgerOpened && "header__burger-button_hidden"
    }`;
  const CloseBurgerButtonClassName = `header__close-burger-button_invisible ${isBurgerOpened && "header__close-burger-button"}`;
  const openBurgerMenu = () => {
    setIsBurgerOpened(true);
  };
  const closeBurgerMenu = () => {
    setIsBurgerOpened(false);
  };

  return (
    <header className="header">
      {loggedIn ? (
        <>
          <div className="header__top">
            <img src={logo} alt="лого" className="logo" />
            <button className={BurgerButtonClassName} onClick={openBurgerMenu}></button>
            <button className={CloseBurgerButtonClassName} onClick={closeBurgerMenu}></button>
          </div>
          <div className={BurgerMenuClassName}>
            <p className="header__email">{email}</p>
            <Link className="header__link-list" onClick={onSignOut} to="/sign-in">
              Выйти
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="header__top">
            <img src={logo} alt="лого" className="logo" /> {children}
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
