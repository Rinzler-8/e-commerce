import { api } from "./api";
import queryString from "query-string";

const getCartAPIList = () => {
  const parameters = {};
  // Sử dụng thư viện queryString để chuyển đổi đối tượng thành các param
  // https://www.npmjs.com/package/query-string
  let url = "v1/cart?" + queryString.stringify(parameters);
  return api("GET", url, null, null);
};

// get single Cart
const getCartByUserIdAPI = (id) => {
  let url = "/v1/cart/getCartsByUserId/" + id;
  return api("GET", url, null, null);
};

// Add Cart New
const addToCartAPI = (id, item) => {
  return api("POST", "v1/cart/addToCart/" + id, item);
};

// Xóa Cart theo userId, cartId
const deleteCartItemAPI = (cartId, userId) => {
  let url = "v1/cart/removeProductFromCart/" + cartId + "/" + userId;
  return api("DELETE", url, null, null);
};
// Xóa Cart theo userId
const deleteAllCartItemsAPI = (userId) => {
  let url = "v1/cart/removeAllProductsCart/" + userId;
  return api("DELETE", url, null, null);
};
// Update Cart
const updateCartAPI = (id, CartUpdate) => {
  let url = "v1/cart/updateQtyForCart/" + id;
  // console.log("Link URL: ", url)
  return api("PUT", url, CartUpdate);
};

export { getCartAPIList, getCartByUserIdAPI, addToCartAPI, deleteCartItemAPI, updateCartAPI, deleteAllCartItemsAPI };
