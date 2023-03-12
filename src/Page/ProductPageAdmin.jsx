import React, { useEffect, useState } from "react";
import { Container, Row, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import ProductResultForm from "../Components/Result/ProductResultForm";
// import CreateButton from "./../Components/Admin/CreateButton";
import { useDispatch, useSelector } from "react-redux";
import { actionAddProductAPI, actionDeleteProductAPI, actionFetchProductAPI, actionUpdateProductAPI, actionFetchSingleProductAPI } from "../Redux/Action/ProductAction";
import PaginationButton from "../Components/Paging/PaginationButton";
import { actionChangePage, actionChangeSize, actionChangeSortDirection, actionChangeSortField, actionSearch } from "../Redux/Action/PageAction";
import SizeButton from "../Components/Paging/SizeButton";
import ProductFieldSortButton from "../Components/Paging/ProductFieldSortButton";
import DirectionSortButton from "../Components/Paging/DirectionSortButton";
import SearchComponent from "../Components/SearchComponent/SearchComponent";
import ModalCreateNewProduct from "../Components/Product/CreateNewProduct/ModalCreateNewProduct";
import { actionFetchProductUpdateInfoRedux } from "../Redux/Action/FormUpdateAction";
import ModalUpdateProduct from "../Components/Product/UpdateProduct/ModalUpdateProduct";
import { actionFetchCategoryAPI } from "../Redux/Action/CategoryAction";
import { actionFetchManufacturerAPI } from "../Redux/Action/ManufacturerAction";
import { Grid } from "@mui/material";
import ProductList from "../Components/Product/ProductList";
import { actionToggleUpdateFormRedux } from "../Redux/Action/FormUpdateAction";
import Product from "../Components/Product/Product";
import { useParams } from "react-router-dom";

function ProductPage(props) {
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
    dispatchRedux(actionFetchProductAPI(filter));
    dispatchRedux(actionFetchManufacturerAPI());
    dispatchRedux(actionFetchCategoryAPI());
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [stateRedux.pageFilterReducer.page, stateRedux.pageFilterReducer.size, stateRedux.pageFilterReducer.sort, stateRedux.pageFilterReducer.search]);

  // Xử lý xóa Product
  let onHandleDelete = (id) => {
    console.log("Id của Product cần xóa:", id);
    dispatchRedux(actionDeleteProductAPI(id));
    setShowNotificationDelete(true);
  };
  // Xử lý khi nhấn nút Edit
  let onHandleEdit = (productUpdate) => {
    console.log("Thông tin của Product cần update:", productUpdate);
    // Lưu thông tin Product Update lên Redux
    dispatchRedux(actionFetchProductUpdateInfoRedux(productUpdate));
    // Hiển thị formUpdate
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  // Xử lý Update Product
  let onHandleUpdateProduct = (ProductUpdate_New) => {
    let id = stateRedux.formUpdateReducer.productUpdateInfo.product_id;
    dispatchRedux(actionUpdateProductAPI(id, ProductUpdate_New));
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
  // Xử lý thêm mới Product
  let onHandleCreateNewProduct = (productNew) => {
    // console.log("Thông tin Product cần thêm mới: ", productNew);
    dispatchRedux(actionAddProductAPI(productNew));
  };
  // Thông tin trang hiện tại từ redux để truyền xuống PaginationButton hiển thị
  let currentPage = stateRedux.pageFilterReducer;
  return (
    <>
      {/* Hiển thị modal form update */}
      <ModalUpdateProduct onHandleUpdateProduct={onHandleUpdateProduct} />
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
        <ToastBody style={{ color: "black", fontSize: 25 }}>Delete Product Success!!</ToastBody>
      </Toast>
      <br />
      <br />

      <br />
      {/* Modal thêm mới Product */}
      <ModalCreateNewProduct onHandleCreateNewProduct={onHandleCreateNewProduct} />
      {/* Search dữ liệu */}
      <br />
      <SearchComponent onHandleSearch={onHandleSearch} />
      {/* Form kết quả */}
      <ProductResultForm onHandleDelete={onHandleDelete} onHandleEdit={onHandleEdit}></ProductResultForm>

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
              <ProductFieldSortButton onHandleChangeFieldSort={onHandleChangeFieldSort} />
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

export default ProductPage;
