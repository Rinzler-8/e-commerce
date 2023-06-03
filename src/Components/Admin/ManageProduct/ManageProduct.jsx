import React, { useEffect, useRef, useState } from "react";
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
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import {
  actionAddProductAPI,
  actionFetchProductAPI,
  actionUpdateProductAPI,
  actionDeleteProductAPI,
  actionImportProductAPI,
} from "../../../Redux/Action/ProductAction";
import { importXLSXProductAPI } from "../../../API/ProductAPI";

function ManageProduct(props) {
  const stateRedux = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  // State quản lý đóng mở thông báo.
  let [showNotificationDelete, setShowNotificationDelete] = useState(false);
  let [previewImportFile, setPreviewImportFile] = useState();
  const importFile = useRef(null);

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
    previewImportFile
  ]);

  // Xử lý xóa Product
  const onHandleDelete = (id) => {
    dispatchRedux(actionDeleteProductAPI(id));
    setShowNotificationDelete(true);
  };
  // Xử lý khi nhấn nút Edit
  const onHandleEditBtn = (ProductEdit) => {
    // Lưu thông tin Product Update lên Redux
    dispatchRedux(actionFetchProductUpdateInfoRedux(ProductEdit));
    // Hiển thị formUpdate
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  // Xử lý Update Product
  const onHandleUpdateProduct = (productUpdate) => {
    let id = stateRedux.formUpdateReducer.productUpdateInfo.id;
    console.log("Thông tin của Product cần update:", id);

    dispatchRedux(actionUpdateProductAPI(id, productUpdate));
  };

  // Xử lý khi click vào các icon phân trang
  const onHandleChangePage = (page) => {
    // Thực hiện dispatch action để set lại giá trị page trên redux
    dispatchRedux(actionChangePage(page));
  };
  // Hàm xử lý khi người dùng ChangeSize
  const onHandleChangeSize = (item) => {
    dispatchRedux(actionChangeSize(item));
  };
  // Hàm xử lý khi người dùng thay đổi SortField
  const onHandleChangeFieldSort = (item) => {
    dispatchRedux(actionChangeSortField(item));
  };

  // Hàm xử lý khi người dùng thay đổi SortDirection
  const onHandleChangeDirectionSort = (item) => {
    dispatchRedux(actionChangeSortDirection(item));
  };
  // Hàm xử lý khi nhấn nút Search
  const onHandleSearch = (valueSearch) => {
    dispatchRedux(actionSearch(valueSearch));
  };
  // Xử lý thêm mới Product
  const onHandleCreateNewProduct = (productNew) => {
    dispatchRedux(actionAddProductAPI(productNew));
  };

  const onHandleImportProduct = (file) => {
    dispatchRedux(actionImportProductAPI(file));
  };
  
  const onChangeImportFile = (e) => {
    const file = e.target.files[0];
    setPreviewImportFile(file);
  };

  const importPreviewFile = () => {
    if (previewImportFile) {
      onHandleImportProduct(previewImportFile);
    }
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
        <div>
          <button onClick={() => importFile.current.click()}>
            <UploadFileIcon /> Import Preview
          </button>
          <input
            type="file"
            id="importFile"
            ref={importFile}
            onChange={onChangeImportFile}
            style={{ display: "none" }}
          />
        </div>
        <button onClick={importPreviewFile}>
          <DownloadIcon /> Import
        </button>
        <button onClick={openCreateNewProductModal}>
          <DownloadIcon /> Export
        </button>
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
