const BASE_URL = "https://api.mestopage.nomoredomains.xyz";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка в веденных данных ${res.status}`);
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
  }).then(checkResponse);
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
  }).then(checkResponse);
};
