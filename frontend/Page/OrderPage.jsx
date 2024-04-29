import React, { useEffect } from "react";
import { actionFetchOrderAPI } from "../redux/Action/OrderAction";
// import CreateButton from "./../Components/Admin/CreateButton";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../Components/Admin/MenuBar/MenuBar";
import ManageOrder from "../Components/Admin/ManageOrder/ManageOrder";
import ManageOrderUser from "../Components/Admin/ManageOrder/ManageOrderUser";
import storage from "../Storage/Storage";

function OrderPage(props) {
  return (
    <>
      {storage.getItem("role") === "ADMIN" ? (
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
