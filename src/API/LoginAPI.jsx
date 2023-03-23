import { api } from "./api";

const checkLoginAPI = (accountLogin) => {
  return api("POST", "auth/signin", accountLogin);
};

const checkLogoutAPI = (accountLogout) => {
  return api("POST", "auth/signout", accountLogout);
};

export { checkLoginAPI };
