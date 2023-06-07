import { api } from "./api";

const resetPassAPI = (token, pass) => {
  const parameters = {};
  parameters.token = token;
  let url = "auth/resetPassword?token=" + token.token;
  pass = {
    password: pass.password,
  };
  return api("POST", url, pass);
};

const forgotPassAPI = (email) => {
  let url = "auth/resetPasswordRequest?email=" + email;
  return api("GET", url);
};

export { resetPassAPI, forgotPassAPI };
