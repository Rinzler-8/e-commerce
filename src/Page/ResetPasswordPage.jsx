import React, { useEffect } from "react";
import LoginComponent from "../Components/Login/LoginComponent";
import { checkLoginAPI } from "../API/LoginAPI";
import storage from "../Storage/Storage";
import { Outlet, Navigate, useNavigate } from "react-router-dom";


import "./../../src/css/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage(props) {
  let navigate = useNavigate();

  let handleLogin = (accountLogin) => {
    // console.log("Value: ", accountLogin);
    // Call API
    checkLoginAPI(accountLogin)
      .then((response) => {
        if (response !== null && response !== undefined) {
          console.log("response: ", response);
          let accountLoginSaveToStorage = {
            id: response.id,
            username: accountLogin.username,
            email: response.email,
            role: response.roles,
            status: response.status,
          };
          // Lưu thông tin Account vào LocalStorage để sử dụng về sau
          storage.setUserInfo(accountLoginSaveToStorage);
          storage.setToken(accountLoginSaveToStorage);
          console.log('ROLE: ', storage.getItem("role"));
          toast.success("Login thành công.", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          window.location.reload();
          setTimeout(() => navigate("/"), 1000);
        } else {
          toast.error("Thông tin đăng nhập sai! Vui lòng thử lại.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // useEffect(() => {
  //   let accountLoginSaveToStorage = storage.getUserInfo();
  //   if (accountLoginSaveToStorage) {
  //     // TH này khi User đã login sẽ chuyển tới trang home
  //      navigate("/admin");
  //   }
  //   else {
  //      navigate("/login");
  //   }
  // }, []);
  useEffect(() => {
    if (storage.getItem("token")) {
       navigate("/");
    }
    else {
       navigate("/login");
    }
  }, []);
  return (
    <div>
      <LoginComponent handleLogin={handleLogin} />
      <ToastContainer />;
    </div>
  );
}

export default LoginPage;
