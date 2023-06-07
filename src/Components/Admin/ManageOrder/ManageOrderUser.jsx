import React, { useState } from "react";
import "./ManageOrder.css";
import HeaderBar from "../HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import { actionChangePage, actionChangeSize, actionChangeSortDirection, actionChangeSortField, actionSearch } from "../../../Redux/Action/PageAction";
import { actionFetchOrderUpdateInfoRedux, actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";
import OrderList from "../../Result/Order/OrderList";
import ModalCreateNewOrder from "../CreateNewOrder/ModalCreateNewOrder";
import { actionAddOrderAPI } from "../../../Redux/Action/OrderAction";

function ManageOrderUser(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  // State quản lý đóng mở thông báo.

  // Xử lý khi nhấn nút Edit
  let onHandleEditBtn = (OrderEdit) => {
    // console.log("Thông tin của Account cần update:", OrderEdit);
    // Lưu thông tin Account Update lên Redux
    dispatchRedux(actionFetchOrderUpdateInfoRedux(OrderEdit));
    // Hiển thị formUpdate
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  // Xử lý khi click vào các icon phân trang
  let onHandleChangePage = (page) => {
    // console.log("Trang hiện tại: ", page);
    // Thực hiện dispatch action để set lại giá trị page trên redux
    dispatchRedux(actionChangePage(page));
  };
  // Hàm xử lý khi người dùng ChangeSize
  let onHandleChangeSize = (item) => {
    dispatchRedux(actionChangeSize(item));
  };
  // Hàm xử lý khi người dùng thay đổi SortField
  let onHandleChangeFieldSort = (item) => {
    dispatchRedux(actionChangeSortField(item));
  };

  // Hàm xử lý khi người dùng thay đổi SortDirection
  let onHandleChangeDirectionSort = (item) => {
    dispatchRedux(actionChangeSortDirection(item));
  };
  // Hàm xử lý khi nhấn nút Search
  let onHandleSearch = (valueSearch) => {
    dispatchRedux(actionSearch(valueSearch));
  };
  // Xử lý thêm mới Account
  let onHandleCreateNewOrder = (orderNew) => {
    dispatchRedux(actionAddOrderAPI(orderNew));
  };
  // Thông tin trang hiện tại từ redux để truyền xuống PaginationButton hiển thị
  let currentPage = stateRedux.pageFilterReducer;

  let [showModal, SetShowModal] = useState(false);

  // Xử lý ẩn hiện modal
  const openCreateNewOrderModal = () => {
    SetShowModal(!showModal);
  };

  return (
    <div className="manage-user-container">
      <div className="header-area">
        <HeaderBar onHandleSearch={onHandleSearch} title="Đơn hàng của bạn" placeHolder="Nhập phiên..." />
      </div>
      <div className="table-content-area-user">
        <OrderList
          onHandleEditBtn={onHandleEditBtn}
          onHandleChangeSize={onHandleChangeSize}
          onHandleChangePage={onHandleChangePage}
          currentPage={currentPage}
          onHandleChangeFieldSort={onHandleChangeFieldSort}
          onHandleChangeDirectionSort={onHandleChangeDirectionSort}
        />
      </div>
      <ModalCreateNewOrder onHandleCreateNewOrder={onHandleCreateNewOrder} toggle={openCreateNewOrderModal} showModal={showModal} />
    </div>
  );
}

export default ManageOrderUser;
