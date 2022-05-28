import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setToken = (token) => {
  cookies.set("jwt", token);
  console.log(cookies.get("jwt"));
};

export const getToken = () => cookies.get("jwt");

export const removeToken = () => {
  cookies.remove("jwt");
};
