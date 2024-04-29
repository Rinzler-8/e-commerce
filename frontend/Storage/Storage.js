const setRememberMe = (isRememberMe) => {
  localStorage.setItem("isRememberMe", isRememberMe);
};

const isRememberMe = () => {
  if (!localStorage.getItem("isRememberMe")) {
    return false; //false: TH này không để RememberMe
  }

  // convert string to boolean
  return JSON.parse(localStorage.getItem("isRememberMe").toLowerCase());
};

const setItem = (key, value) => {
  if (isRememberMe()) {
    localStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, value);
  }
};

const getItem = (key) => {
  if (isRememberMe()) {
    return localStorage.getItem(key);
  } else {
    return sessionStorage.getItem(key);
  }
};

const removeItem = (key) => {
  if (isRememberMe()) {
    return localStorage.removeItem(key);
  } else {
    return sessionStorage.removeItem(key);
  }
}

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
  setItem("token", token);
  document.cookie = token;
};
const setRefreshToken = (token) => {
  setItem("refreshToken", token);
};

const removeToken = () => {
  removeItem("token");
  removeItem("refreshToken");
};

const getToken = () => {
  return { token: getItem("token") };
};

const isAuth = () => {
  return getToken() !== null && getToken() !== undefined;
};

// export
const storage = { setUserInfo, getUserInfo, removeUserInfo, setToken, getToken, removeToken, getItem, setItem, removeItem, setRefreshToken, setRememberMe, isRememberMe };
export default storage;
