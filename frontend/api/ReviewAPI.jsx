import { api } from "./api";
import queryString from "query-string";

const getReviewAPIList = (filter) => {
  // page = 1, size = 10
  const parameters = {};

  if (filter && filter.page) {
    parameters.page = filter.page;
  }
  if (filter && filter.totalElements) {
    parameters.totalElements = filter.totalElements;
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
  let url = "v1/reviews?" + queryString.stringify(parameters);
  // console.log("search url: ", url);
  // products?page=1&size=10

  return api("GET", url, null, null);
};


// Add Product New
const reviewProductAPI = (review) => {
  return api("POST", "v1/reviews", review);
};


export {
  getReviewAPIList,
  reviewProductAPI,
};
