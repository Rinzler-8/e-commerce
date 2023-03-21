import { api } from "./api";
import queryString from "query-string";

const getAccountAPIList = (filter) => {
  // console.log("filter getAccountAPIList: ", filter);
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

  console.log("parameters: ", parameters);
  // Sử dụng thư viện queryString để chuyển đổi đối tượng thành các param
  // https://www.npmjs.com/package/query-string
  let url = "v1/accounts?" + queryString.stringify(parameters);
  // accounts?page=1&size=10
  console.log("Link url: ", url);

  return api("GET", url, null, null);
};

// get single product
const getSingleAccountAPI = (id) => {
  let url = "v1/accounts/" + id;
  return api("GET", url, null, null);
};

// Check exist by Email
const getEmailExists = (email) => {
  let url = "v1/accounts/email/" + email;
  return api("GET", url, null);
};

// Check exist by Username
const getUsernameExists = (username) => {
  let url = "v1/accounts/username/" + username;
  return api("GET", url, null);
};

// Add Account New
const addAccountNewAPI = (AccountNew) => {
  return api("POST", "accounts/", AccountNew);
};

// Xóa Account
const deleteAccountAPI = (id) => {
  let url = "v1/accounts/" + id;
  return api("DELETE", url, null, null);
};
// Update Account
const updateAccountAPI = (id, accountUpdate) => {
  let url = "v1/accounts/" + id;
  console.log("Account dưới API: ", accountUpdate)
  return api("PUT", url, accountUpdate);
};
// Update Account
const deactivateAccountAPI = (id, accountDeactivate) => {
  let url = "v1/accounts/" + id;
  return api("PUT", url, accountDeactivate);
};

export { getAccountAPIList, getEmailExists, getUsernameExists, addAccountNewAPI, deleteAccountAPI, updateAccountAPI, deactivateAccountAPI, getSingleAccountAPI };
