import { api } from "./api";

const getUserStatusAPI = () => {
  return api("GET", "v1/userStatus", null);
};

const getSingleCategoryAPI = (id) => {
  return api("GET", "v1/categories/" + id, null);
};

// export

export { getUserStatusAPI };
