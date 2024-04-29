import { api } from "./api";

const addAccountNewAPI = (AccountNew) => {
  AccountNew = {
    username: AccountNew.username,
    email: AccountNew.email,
    password: AccountNew.password,
    mobile: AccountNew.mobile,
    role: AccountNew.role,
  };
  return api("POST", "auth/signup", AccountNew);
};

export { addAccountNewAPI };
