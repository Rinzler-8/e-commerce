import { api } from "./api";
import queryString from "query-string";

const resetPassAPI = (token, pass) => {
  const parameters = {};
  parameters.token = token;
  let url = "auth/resetPassword?token=" + token.token;
  pass = {
    password: pass.password
  }
  console.log("passAPI: ", pass);
  console.log("tokenAPI: ", token);
  return api("POST", url, pass);
};

export { resetPassAPI };
