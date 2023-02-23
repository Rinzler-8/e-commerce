const setRememberMe = (isRememberMe) => {
  localStorage.setItem("isRememberMe", isRememberMe);
};

const isRememberMe = () => {
  if (localStorage.getItem("isRememberMe") === null || localStorage.getItem("isRememberMe") === undefined) {
    return false; //false: TH này không để RememberMe
  }

  // convert string to boolean
  return JSON.parse(localStorage.getItem("isRememberMe"));
};

// const setItem = (key, value) => {
//   if (isRememberMe()) {
//     localStorage.setItem(key, value);
//   } else {
//     sessionStorage.setItem(key, value);
//   }
// };

// const getItem = (key) => {
//   if (isRememberMe()) {
//     return localStorage.getItem(key);
//   } else {
//     return sessionStorage.getItem(key);
//   }
// };

const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

const getItem = (key) => {
  localStorage.getItem(key);
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

const setUserInfo = (accountLogin) => {
  setItem("id", accountLogin.id);
  setItem("username", accountLogin.username);
  setItem("email", accountLogin.email);
  setItem("role", accountLogin.role);
  setItem("status", accountLogin.status);
};

const getUserInfo = () => {
  return {
    id: getItem("id"),
    username: getItem("username"),
    password: getItem("password"),
    email: getItem("email"),
    role: getItem("role"),
    status: getItem("status"),
  };
};

const removeUserInfo = () => {
  removeItem("id");
  removeItem("username");
  removeItem("email");
  removeItem("role");
  removeItem("status");
};

const setToken = (token) => {
  setItem("token", token.token);
};

const removeToken = () => {
  removeItem("token");
};

const getToken = () => {
  return { token: getItem("token") };
};

const isAuth = () => {
  return getToken() !== null && getToken() !== undefined;
};

// export
const storage = { setUserInfo, getUserInfo, removeUserInfo, setToken, getToken, removeToken, isAuth };
export default storage;
