import React from "react";
import MenuBar from "../Components/Admin/MenuBar/MenuBar";
import ManageUser from "../Components/Admin/ManageUser/ManageUser";
import "../css/AdminPage.css";

export default function AdminPage(props) {
  // Lấy dữ liệu page, size được quản lý từ Redux
  // useEffect(() => {
  //   let accountLoginSaveToStorage = storage.getUserInfo();
  //   if (!accountLoginSaveToStorage) {
  //     // TH này khi User đã login sẽ chuyển tới trang home
  //     return navigate("/login");
  //   }
  // }, []);

  //gọi useEffect để load dữ liệu, chỉ gọi khi các state page hoặc size, ... từ redux thay đổi

  return (
    <div className="admin-page-container">
      <MenuBar/>
      <div className="content-area-admin">
        <ManageUser/>
      </div>

      {/* Thông báo thêm mới thành công */}
      {/* <Toast isOpen={showNotificationDelete}>
        <ToastHeader
          style={{ backgroundColor: "red", color: "black", fontSize: 20 }}
          toggle={() => {
            setShowNotificationDelete(false);
          }}
        >
          Notification
        </ToastHeader>
        <ToastBody style={{ color: "black", fontSize: 25 }}>Delete Account Success!!</ToastBody>
      </Toast> */}
    </div>
  );
}


