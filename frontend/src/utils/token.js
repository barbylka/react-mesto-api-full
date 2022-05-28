import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setToken = (token) => {
  cookies.set("jwt", token);
};

export const getToken = () => {
  cookies.get("jwt");
  console.log(cookies.get("jwt"));
};

export const removeToken = () => {
  cookies.remove("jwt");
};
