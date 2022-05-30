import React from "react";
import { useValidation } from "../utils/validation";

const Login = ({ onLogin }) => {
  const [data, setData] = React.useState({
    password: "",
    email: "",
  });
  const passwordValid = useValidation();
  const emailValid = useValidation();
  const saveButtonClassName = `login__save-button 
  ${(passwordValid.isWrong || emailValid.isWrong) && "login__save-button_disabled"}`;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(data.password, data.email);
  };

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__inputs">
          <label className="login__field">
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
              className="login__text login__text_type_email"
              name="email"
            />
            <span className="login__text-error email-input-error">
              {emailValid.isWrong && emailValid.errorMessage}
            </span>
          </label>
          <label className="login__field">
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
              className="login__text login__text_type_password"
              name="password"
              minLength="4"
            />
            <span className="login__text-error password-input-error">
              {passwordValid.isWrong && passwordValid.errorMessage}
            </span>
          </label>
        </fieldset>
        <button
          disabled={passwordValid.isWrong || emailValid.isWrong}
          className={saveButtonClassName}
          type="submit"
        >
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
