import React, { useEffect, useState } from "react";
import "./ManageOrder.css";
import HeaderBar from "../HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchOrderAPI, actionUpdateOrderAPI, actionDeleteOrderAPI } from "../../../Redux/Action/OrderAction";
import { actionChangePage, actionChangeSize, actionChangeSortDirection, actionChangeSortField, actionSearch } from "../../../Redux/Action/PageAction";
import { actionFetchAccountUpdateInfoRedux, actionFetchOrderUpdateInfoRedux, actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";
import { useNavigate } from "react-router-dom";
import OrderList from "../../Result/Order/OrderList";
import ModalCreateNewOrder from "../CreateNewOrder/ModalCreateNewOrder";
import AddIcon from "@mui/icons-material/Add";
import { actionAddOrderAPI } from "../../../Redux/Action/OrderAction";

function ManageOrderUser(props) {
  let stateRedux = useSelector((state) => state);
  let navigate = useNavigate();
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
  useEffect(() => {
    dispatchRedux(actionFetchOrderAPI(filter));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [stateRedux.pageFilterReducer.page, stateRedux.pageFilterReducer.size, stateRedux.pageFilterReducer.sort, stateRedux.pageFilterReducer.search]);

  // Xử lý xóa Account
  let onHandleDelete = (id) => {
    console.log("Id của Account cần xóa:", id);
    dispatchRedux(actionDeleteOrderAPI(id));
    setShowNotificationDelete(true);
  };
  // Xử lý khi nhấn nút Edit
  let onHandleEditBtn = (OrderEdit) => {
    // console.log("Thông tin của Account cần update:", OrderEdit);
    // Lưu thông tin Account Update lên Redux
    dispatchRedux(actionFetchOrderUpdateInfoRedux(OrderEdit));
    // Hiển thị formUpdate
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  // Xử lý Update Account
  let onHandleUpdateOrder = (orderUpdate) => {
    let id = stateRedux.formUpdateReducer.orderUpdateInfo.id;
    dispatchRedux(actionUpdateOrderAPI(id, orderUpdate));
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
