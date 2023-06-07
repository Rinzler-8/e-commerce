import React, { useEffect, useState } from "react";
import "./ManageUser.css";
import HeaderBar from "../HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddAccountAPI,
  actionDeleteAccountAPI,
  actionFetchAccountAPI,
  actionUpdateAccountAPI,
} from "../../../Redux/Action/AccountAction";
import {
  actionChangePage,
  actionChangeSize,
  actionChangeSortDirection,
  actionChangeSortField,
  actionSearch,
} from "../../../Redux/Action/PageAction";
import {
  actionFetchAccountUpdateInfoRedux,
  actionToggleUpdateFormRedux,
} from "../../../Redux/Action/FormUpdateAction";
import AccountList from "./../../Result/Account/AccountList";
import ModalUpdateAccount from "../../../Components/Admin/UpdateAccount/ModalUpdateAccount";
import ModalCreateNewAccount from "../../../Components/Admin/CreateNewAccount/ModalCreateNewAccount";
import AddIcon from "@mui/icons-material/Add";

function ManageUser(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let [showModal, SetShowModal] = useState(false);

  // Lấy dữ liệu page, size được quản lý từ Redux
  let filter = {
    page: stateRedux.pageFilterReducer.page,
    size: stateRedux.pageFilterReducer.size,
    sort: stateRedux.pageFilterReducer.sort,
    search: stateRedux.pageFilterReducer.search,
  };
  useEffect(() => {
    dispatchRedux(actionFetchAccountAPI(filter));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [
    stateRedux.pageFilterReducer.page,
    stateRedux.pageFilterReducer.size,
    stateRedux.pageFilterReducer.sort,
    stateRedux.pageFilterReducer.search,
  ]);

  // Xử lý xóa Account
  let onHandleDelete = (id) => {
    console.log("Id của Account cần xóa:", id);
    dispatchRedux(actionDeleteAccountAPI(id));
    // Xử lý khi nhấn nút Edit
    let onHandleEditBtn = (AccountEdit) => {
      // console.log("Thông tin của Account cần update:", AccountEdit);
      // Lưu thông tin Account Update lên Redux
      dispatchRedux(actionFetchAccountUpdateInfoRedux(AccountEdit));
      // Hiển thị formUpdate
      dispatchRedux(actionToggleUpdateFormRedux());
    };

    // Xử lý Update Account
    let onHandleUpdateAccount = (accountUpdate) => {
      let id = stateRedux.formUpdateReducer.accountUpdateInfo.id;
      dispatchRedux(actionUpdateAccountAPI(id, accountUpdate));
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
      console.log("valueSearch: ", valueSearch);
    };
    // Xử lý thêm mới Account
    let onHandleCreateNewAccount = (accountNew) => {
      dispatchRedux(actionAddAccountAPI(accountNew));
    };
    // Thông tin trang hiện tại từ redux để truyền xuống PaginationButton hiển thị
    let currentPage = stateRedux.pageFilterReducer;

    // Xử lý ẩn hiện modal
    const openCreateNewAccountModal = () => {
      SetShowModal(!showModal);
    };

    return (
      <div className="manage-user-container">
        <div className="header-area">
          <HeaderBar
            onHandleSearch={onHandleSearch}
            title="Quản lí tài khoản người dùng"
            placeHolder="Nhập tên tài khoản,email..."
          />
        </div>
        <div className="create-new-user">
          <button onClick={openCreateNewAccountModal}>
            <AddIcon /> Tạo tài khoản mới
          </button>
        </div>
        <div className="table-content-area">
          <AccountList
            onHandleEditBtn={onHandleEditBtn}
            onHandleChangeSize={onHandleChangeSize}
            onHandleChangePage={onHandleChangePage}
            currentPage={currentPage}
            onHandleChangeFieldSort={onHandleChangeFieldSort}
            onHandleChangeDirectionSort={onHandleChangeDirectionSort}
          />
        </div>
        <ModalUpdateAccount
          onHandleUpdateAccount={onHandleUpdateAccount}
          onHandleDelete={onHandleDelete}
        />
        <ModalCreateNewAccount
          onHandleCreateNewAccount={onHandleCreateNewAccount}
          toggle={openCreateNewAccountModal}
          showModal={showModal}
        />
      </div>
    );
  };
}
export default ManageUser;
