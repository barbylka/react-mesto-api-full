import React from "react";
import { Link } from "react-router-dom";
import { useValidation } from "../utils/validation";

const Register = ({ onRegister }) => {
  const [data, setData] = React.useState({
    password: "",
    email: "",
  });
  const passwordValid = useValidation();
  const emailValid = useValidation();
  const saveButtonClassName = `register__save-button 
  ${(passwordValid.isWrong || emailValid.isWrong) && "register__save-button_disabled"}`;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(data.password, data.email);
  };

  return (
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="register__inputs">
          <label className="register__field">
            <input
              type="email"
              id="email-input"
              required
              placeholder="Email"
              value={data.email}
              onChange={(e) => {
                handleChange(e);
                emailValid.onBlur(e);
              }}
              className="register__text register__text_type_email"
              name="email"
            />
            <span className="register__text-error email-input-error">
              {emailValid.isWrong && emailValid.errorMessage}
            </span>
          </label>
          <label className="register__field">
            <input
              type="password"
              id="password-input"
              required
              placeholder="Пароль"
              value={data.password}
              onChange={(e) => {
                handleChange(e);
                passwordValid.onBlur(e);
              }}
              className="register__text register__text_type_password"
              name="password"
              minLength="4"
            />
            <span className="register__text-error password-input-error">
              {passwordValid.isWrong && passwordValid.errorMessage}
            </span>
          </label>
        </fieldset>
        <button
          disabled={passwordValid.isWrong || emailValid.isWrong}
          className={saveButtonClassName}
          type="submit"
        >
          Зарегистрироваться
        </button>
        <p className="register__hint">
          Уже зарегистрированы?{" "}
          <Link className="register__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
