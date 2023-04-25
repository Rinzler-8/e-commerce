import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  // timeout: 5000, // default is `0` (no timeout)
  headers: {
    // "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use((config) => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('user');
  // Nếu có token, thì thêm vào request header
  const parseToken = JSON.parse(token);
  if (token) {
    config.headers.Authorization = `Bearer ${parseToken.bearer_token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const api = (method, endpoint, payload) => {
  return axiosClient(endpoint, { method: method, data: payload })
    .then((response) => {
      //   console.log("api");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
