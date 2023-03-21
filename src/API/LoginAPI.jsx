import { api } from "./api";

const checkLoginAPI = (accountLogin) => {
  return api("POST", "auth/signin", accountLogin);
};

export { checkLoginAPI };
