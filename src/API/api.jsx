import axios from "axios";
import { refreshTokenAPI } from "./LoginAPI";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  // timeout: 5000, // default is `0` (no timeout)
  headers: {
    // "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    const parseJwt = (token) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(decodedPayload);
      } catch (e) {
        return null;
      }
    };
    const decodedJwt = parseJwt(token);
    // Nếu có token, thì thêm vào request header
    if (decodedJwt && decodedJwt.exp * 1000 > Date.now()) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("request", config.headers.Authorization);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await axiosClient.post("auth/refreshtoken", {
            refreshToken: localStorage.getItem("refreshToken"),
          });

          const { accessToken } = rs.data;

          refreshTokenAPI(accessToken);
          localStorage.setItem("token", accessToken);

          return axiosClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export const api = async (method, endpoint, payload) => {
  // console.log('payload', payload);

  try {
    const response = await axiosClient(endpoint, { method: method, data: payload });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
