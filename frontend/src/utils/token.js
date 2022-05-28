import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setToken = (token) => {
  cookies.set("jwt", token);
};

export const getToken = () => {
  console.log('get token');
  console.log(cookies.get("jwt"));
  return cookies.get("jwt");
};

export const removeToken = () => {
  cookies.remove("jwt");
};
