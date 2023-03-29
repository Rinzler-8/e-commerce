import { api } from "./api";

const getCategoryAPIList = () => {
  return api("GET", "v1/categories", null);
};

const getSingleCategoryAPI = (id) => {
  return api("GET", "v1/categories/" + id, null);
};

// export

export { getCategoryAPIList };
