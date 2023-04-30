import { api } from "./api";

const getOrderStatusAPI = () => {
  return api("GET", "v1/orderStatus", null);
};

const getSingleCategoryAPI = (id) => {
  return api("GET", "v1/categories/" + id, null);
};

// export

export { getOrderStatusAPI };
