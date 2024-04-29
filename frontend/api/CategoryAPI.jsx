import { api } from "./api";

const getCategoryAPIList = () => {
  return api("GET", "v1/categories", null);
};

// export

export { getCategoryAPIList };
