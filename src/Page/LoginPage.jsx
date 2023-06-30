import React, { useEffect, useState } from "react";
import LoginComponent from "../Components/Login/LoginComponent";
import { checkLoginAPI } from "../API/LoginAPI";
import storage from "../Storage/Storage";
import { useNavigate } from "react-router-dom";
import "./../../src/css/LoginPage.css";
import "./../../src/css/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage(props) {
  let navigate = useNavigate();
  const [showRemember, setShowRemember] = useState(false);
  let handleLogin = (accountLogin) => {
    // console.log("Value: ", accountLogin);
    // Call API
    checkLoginAPI(accountLogin)
      .then((response) => {
        if (response !== null && response !== undefined) {
          let accountLoginSaveToStorage = {
            id: response.id,
            username: response.username,
            email: response.email,
            role: response.roles,
            status: response.status,
            token: response.token,
            refreshToken: response.refreshToken,
          };
          // Lưu thông tin Account vào LocalStorage để sử dụng về sau
          storage.setRememberMe(showRemember);
          storage.setUserInfo(accountLoginSaveToStorage);
          storage.setToken(response.token);
          storage.setRefreshToken(response.refreshToken);
          toast.success("Đăng nhập thành công.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => navigate(0) && navigate("/"), 1500);
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

  useEffect(() => {
    if (storage.getItem("token")) {
      navigate("/");
      if (
        storage.getItem("token") &&
        storage.getItem("role") === "ADMIN"
      ) {
        navigate("/admin");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div
      className="loginContainer"
      style={{ height: "65vh", alignItems: "center" }}
    >
      <LoginComponent
        handleLogin={handleLogin}
        showRemember={showRemember}
        setShowRemember={setShowRemember}
      />
      <ToastContainer />
      {/* <div className="vl"></div> */}
    </div>
  );
}

export default LoginPage;
