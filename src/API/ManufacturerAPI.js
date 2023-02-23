import { api } from "./api";

const getManufacturerAPIList = () => {
  return api("GET", "v1/manufacturers", null, null);
};

// export

export { getManufacturerAPIList };
