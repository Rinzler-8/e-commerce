import React, { useEffect, useState } from "react";
import "./ManageProduct.css";
import HeaderBar from "../HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import {
  actionChangePage,
  actionChangeSize,
  actionChangeSortDirection,
  actionChangeSortField,
  actionSearch,
} from "../../../Redux/Action/PageAction";
import {
  actionFetchProductUpdateInfoRedux,
  actionToggleUpdateFormRedux,
} from "../../../Redux/Action/FormUpdateAction";
import { useNavigate } from "react-router-dom";
import ProductListAdmin from "../../Result/Product/ProductListAdmin";
import ModalUpdateProduct from "../UpdateProduct/ModalUpdateProduct";
import ModalCreateNewProduct from "../CreateNewProduct/ModalCreateNewProduct";
import AddIcon from "@mui/icons-material/Add";
import {
  actionAddProductAPI,
  actionFetchProductAPI,
  actionUpdateProductAPI,
  actionDeleteProductAPI,
} from "../../../Redux/Action/ProductAction";

function ManageProduct(props) {
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
    dispatchRedux(actionFetchProductAPI(filter));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [
    stateRedux.pageFilterReducer.page,
    stateRedux.pageFilterReducer.size,
    stateRedux.pageFilterReducer.sort,
    stateRedux.pageFilterReducer.search,
  ]);

  // Xử lý xóa Product
  let onHandleDelete = (id) => {
    dispatchRedux(actionDeleteProductAPI(id));
    setShowNotificationDelete(true);
  };
  // Xử lý khi nhấn nút Edit
  let onHandleEditBtn = (ProductEdit) => {
    // Lưu thông tin Product Update lên Redux
    dispatchRedux(actionFetchProductUpdateInfoRedux(ProductEdit));
    // Hiển thị formUpdate
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  // Xử lý Update Product
  let onHandleUpdateProduct = (productUpdate) => {
    let id = stateRedux.formUpdateReducer.productUpdateInfo.product_id;
    console.log("Thông tin của Product cần update:", id);

    dispatchRedux(actionUpdateProductAPI(id, productUpdate));
  };

  // Xử lý khi click vào các icon phân trang
  let onHandleChangePage = (page) => {
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
  // Xử lý thêm mới Product
  let onHandleCreateNewProduct = (productNew) => {
    dispatchRedux(actionAddProductAPI(productNew));
  };
  // Thông tin trang hiện tại từ redux để truyền xuống PaginationButton hiển thị
  let currentPage = stateRedux.pageFilterReducer;
  // console.log("Trang hiện tại: ", currentPage);

  let [showModal, SetShowModal] = useState(false);

  // Xử lý ẩn hiện modal
  const openCreateNewProductModal = () => {
    SetShowModal(!showModal);
  };

  return (
    <div className="manage-user-container">
      <div className="header-area">
        <HeaderBar
          onHandleSearch={onHandleSearch}
          title="Quản lí sản phẩm"
          placeHolder="Nhập tên sản phẩm..."
        />
      </div>
      <div className="create-new-user">
        <button onClick={openCreateNewProductModal}>
          <AddIcon /> Tạo sản phẩm mới
        </button>
      </div>
      <div className="table-content-area">
        <ProductListAdmin
          onHandleEditBtn={onHandleEditBtn}
          onHandleChangeSize={onHandleChangeSize}
          onHandleChangePage={onHandleChangePage}
          currentPage={currentPage}
          onHandleChangeFieldSort={onHandleChangeFieldSort}
          onHandleChangeDirectionSort={onHandleChangeDirectionSort}
        />
      </div>
      <ModalUpdateProduct
        onHandleUpdateProduct={onHandleUpdateProduct}
        onHandleDelete={onHandleDelete}
      />
      <ModalCreateNewProduct
        onHandleCreateNewProduct={onHandleCreateNewProduct}
        toggle={openCreateNewProductModal}
        showModal={showModal}
      />
    </div>
  );
}

export default ManageProduct;
