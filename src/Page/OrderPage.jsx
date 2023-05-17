import React, { useEffect, useState } from "react";
import { actionFetchOrderAPI } from "../Redux/Action/OrderAction";
// import CreateButton from "./../Components/Admin/CreateButton";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../Components/Admin/MenuBar/MenuBar";
import ManageOrder from "../Components/Admin/ManageOrder/ManageOrder";
import ManageOrderUser from "../Components/Admin/ManageOrder/ManageOrderUser";

function OrderPage(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  // State quản lý đóng mở thông báo.
  let [showNotificationDelete, setShowNotificationDelete] = useState(false);
  // Lấy dữ liệu page, size được quản lý từ Redux
  let filter = {
    page: stateRedux.pageFilterReducer.page,
    size: stateRedux.pageFilterReducer.size,
    sort: stateRedux.pageFilterReducer.sort,
    search: stateRedux.pageFilterReducer.search,
  };

  //gọi useEffect để load dữ liệu, chỉ gọi khi các state page hoặc size, ... từ redux thay đổi
  useEffect(() => {
    dispatchRedux(actionFetchOrderAPI(filter));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [
    stateRedux.pageFilterReducer.page,
    stateRedux.pageFilterReducer.size,
    stateRedux.pageFilterReducer.sort,
    stateRedux.pageFilterReducer.search,
  ]);

  return (
    <>
      {localStorage.getItem("role") == "ADMIN" ? (
        <div className="admin-page-container">
          <MenuBar />
          <div className="content-area-admin">
            <ManageOrder></ManageOrder>
          </div>
        </div>
      ) : (
        <div>
          <ManageOrderUser></ManageOrderUser>
        </div>
      )}
    </>
  );
}

export default OrderPage;
