import { api } from "./api";
import queryString from "query-string";

const getOrderAPIList = (filter) => {
  // page = 1, size = 10
  const parameters = {};

  if (filter && filter.page) {
    parameters.page = filter.page;
  }
  if (filter && filter.size) {
    parameters.size = filter.size;
  }

  // sort: { sortField: "id", sortDirection: "asc" },
  if (filter && filter.sort) {
    parameters.sort = filter.sort.sortField + "," + filter.sort.sortDirection;
  }
  // search = ""
  if (filter && filter.search) {
    parameters.search = filter.search;
  }

  // Sử dụng thư viện queryString để chuyển đổi đối tượng thành các param
  // https://www.npmjs.com/package/query-string
  let url = "v1/orders?" + queryString.stringify(parameters);
  // orders?page=1&size=10

  return api("GET", url, null, null);
};

// get single order
const getSingleOrderAPI = (id) => {
  let url = "v1/orders/" + id;
  return api("GET", url, null, null);
};

// Add Order New
const addOrderNewAPI = (OrderNew) => {
  return api("POST", "orders/", OrderNew);
};

// Xóa Order
const deleteOrderAPI = (id) => {
  let url = "v1/orders/" + id;
  return api("DELETE", url, null, null);
};
// Update Order
const updateOrderAPI = (id, orderUpdate) => {
  const parameters = {};
  if (id && orderUpdate) {
    parameters.order_id = id;
    parameters.orderStatus = orderUpdate.orderStatus;
  }
  let url = "v1/orders?" + queryString.stringify(parameters);
  return api("PUT", url);
};

export { getOrderAPIList, getSingleOrderAPI, addOrderNewAPI, deleteOrderAPI, updateOrderAPI };
