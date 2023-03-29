import React, { useEffect, useState } from "react";
import { Container, Row, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import OrderResultForm from "../Components/Result/OrderResultForm";
// import CreateButton from "./../Components/Admin/CreateButton";
import { useDispatch, useSelector } from "react-redux";
import { actionAddOrderAPI, actionDeleteOrderAPI, actionFetchOrderAPI, actionUpdateOrderAPI, actionFetchSingleOrderAPI } from "../Redux/Action/OrderAction";
import PaginationButton from "../Components/Paging/PaginationButton";
import { actionChangePage, actionChangeSize, actionChangeSortDirection, actionChangeSortField, actionSearch } from "../Redux/Action/PageAction";
import SizeButton from "../Components/Paging/SizeButton";
import OrderFieldSortButton from "../Components/Paging/OrderFieldSortButton";
import DirectionSortButton from "../Components/Paging/DirectionSortButton";
import SearchComponent from "../Components/SearchComponent/SearchComponent";
import ModalCreateNewOrder from "../Components/Order/CreateNewOrder/ModalCreateNewOrder";
import { actionFetchOrderUpdateInfoRedux, actionToggleUpdateFormRedux } from "../Redux/Action/FormUpdateAction";
import ModalUpdateOrder from "../Components/Order/UpdateOrder/ModalUpdateOrder";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

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
  }, [stateRedux.pageFilterReducer.page, stateRedux.pageFilterReducer.size, stateRedux.pageFilterReducer.sort, stateRedux.pageFilterReducer.search]);

  // Xử lý xóa Order
  let onHandleDelete = (id) => {
    console.log("Id của Order cần xóa:", id);
    dispatchRedux(actionDeleteOrderAPI(id));
    setShowNotificationDelete(true);
  };
  // Xử lý khi nhấn nút Edit
  let onHandleEdit = (orderUpdate) => {
    console.log("Thông tin của Order cần update:", orderUpdate);
    // Lưu thông tin Order Update lên Redux
    dispatchRedux(actionFetchOrderUpdateInfoRedux(orderUpdate));
    // Hiển thị formUpdate
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  // Xử lý Update Order
  let onHandleUpdateOrder = (OrderUpdate_New) => {
    let id = stateRedux.formUpdateReducer.orderUpdateInfo.order_id;
    dispatchRedux(actionUpdateOrderAPI(id, OrderUpdate_New));
  };

  // Xử lý khi click vào các icon phân trang
  let onHandleChangePage = (page) => {
    // console.log("Trang hiện tại: ", page);
    // Thực hiện dispatch action để set lại giá trị page trên redux
    dispatchRedux(actionChangePage(page));
  };
  // Hàm xử lý khi người dùng ChangeSize
  let onHandleChangeSize = (item) => {
    console.log("Size: ", item);
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
    console.log("valueSearch: ", valueSearch);
    dispatchRedux(actionSearch(valueSearch));
  };
  // Xử lý thêm mới Order
  let onHandleCreateNewOrder = (orderNew) => {
    // console.log("Thông tin Order cần thêm mới: ", orderNew);
    dispatchRedux(actionAddOrderAPI(orderNew));
  };
  // Thông tin trang hiện tại từ redux để truyền xuống PaginationButton hiển thị
  let currentPage = stateRedux.pageFilterReducer;
  return (
    <>
      {/* Hiển thị modal form update */}
      <ModalUpdateOrder onHandleUpdateOrder={onHandleUpdateOrder} />
      {/* Thông báo thêm mới thành công */}
      <Toast isOpen={showNotificationDelete}>
        <ToastHeader
          style={{ backgroundColor: "red", color: "black", fontSize: 20 }}
          toggle={() => {
            setShowNotificationDelete(false);
          }}
        >
          Notification
        </ToastHeader>
        <ToastBody style={{ color: "black", fontSize: 25 }}>Delete Order Success!!</ToastBody>
      </Toast>
      <br />
      <br />

      <br />
      {/* Modal thêm mới Order */}
      <ModalCreateNewOrder onHandleCreateNewOrder={onHandleCreateNewOrder} />
      {/* Search dữ liệu */}
      <br />
      <SearchComponent onHandleSearch={onHandleSearch} />
      {/* Form kết quả */}
      <OrderResultForm onHandleDelete={onHandleDelete} onHandleEdit={onHandleEdit}></OrderResultForm>

      {/* Phân trang */}
      <br />
      <Row>
        <Col>
          <PaginationButton onHandleChangePage={onHandleChangePage} currentPage={currentPage} />
        </Col>
        <Col>
          <Row>
            <Col></Col>
            <Col>
              <OrderFieldSortButton onHandleChangeFieldSort={onHandleChangeFieldSort} />
            </Col>
            <Col>
              <DirectionSortButton onHandleChangeDirectionSort={onHandleChangeDirectionSort} />
            </Col>
            <Col>
              <SizeButton onHandleChangeSize={onHandleChangeSize} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default OrderPage;
