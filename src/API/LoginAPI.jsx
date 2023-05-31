import { api } from "./api";

const checkLoginAPI = (accountLogin) => {
  return api("POST", "auth/signin", accountLogin);
};

const refreshTokenAPI = (refresh) => {
  return api("POST", "auth/refreshtoken", refresh);
}

const checkLogoutAPI = (accountLogout) => {
  return api("POST", "auth/signout", accountLogout);
};

export { checkLoginAPI, refreshTokenAPI };
