import { api } from "./api";

// get single Cart
const getOrderInfoAPI = (userId) => {
  let url = "/v1/order/getOrderInfo/" + userId;
  return api("GET", url, null, null);
};
const getOrderItemsAPI = (sessionId) => {
  let url = "/v1/order/getOrderItems/" + sessionId;
  return api("GET", url, null, null);
};

// Add Cart New
const checkoutAPI = (id, item) => {
  return api("POST", "v1/order/checkout1/" + id, item);
};


export {getOrderInfoAPI, getOrderItemsAPI ,checkoutAPI };
