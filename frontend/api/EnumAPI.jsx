import { api } from "./api";

const getUserStatusAPI = () => {
  return api("GET", "v1/userStatus", null);
};

const getOrderStatusAPI = () => {
  return api("GET", "v1/orderStatus", null);
};

const getRoleAPI = () => {
  return api("GET", "v1/role", null);
};
// export

export { getUserStatusAPI, getOrderStatusAPI, getRoleAPI};
