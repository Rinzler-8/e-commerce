import React, { useEffect, useState } from "react";
import { Container, Row, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import AccountResultForm from "../Components/Result/AccountResultForm";
// import CreateButton from "./../Components/Admin/CreateButton";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddAccountAPI,
  actionDeleteAccountAPI,
  actionFetchAccountAPI,
  actionUpdateAccountAPI,
} from "../Redux/Action/AccountAction";
import PaginationButton from "../Components/Paging/PaginationButton";
import { actionChangePage, actionChangeSize, actionChangeSortDirection, actionChangeSortField, actionSearch } from "../Redux/Action/PageAction";
import SizeButton from "../Components/Paging/SizeButton";
import AccountFieldSortButton from "../Components/Paging/AccountFieldSortButton";
import DirectionSortButton from "../Components/Paging/DirectionSortButton";
import SearchComponent from "../Components/SearchComponent/SearchComponent";
import ModalCreateNewAccount from "../Components/Admin/CreateNewAccount/ModalCreateNewAccount";
import { actionFetchAccountUpdateInfoRedux, actionToggleUpdateFormRedux } from "../Redux/Action/FormUpdateAction";
import ModalUpdateAccount from "../Components/Admin/UpdateAccount/ModalUpdateAccount";
import { useNavigate } from "react-router-dom";
import storage from "./../Storage/Storage";

function AdminPage(props) {
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
  // useEffect(() => {
  //   let accountLoginSaveToStorage = storage.getUserInfo();
  //   if (!accountLoginSaveToStorage) {
  //     // TH này khi User đã login sẽ chuyển tới trang home
  //     return navigate("/login");
  //   }
  // }, []);

  //gọi useEffect để load dữ liệu, chỉ gọi khi các state page hoặc size, ... từ redux thay đổi
  useEffect(() => {
    dispatchRedux(actionFetchAccountAPI(filter));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [stateRedux.pageFilterReducer.page, stateRedux.pageFilterReducer.size, stateRedux.pageFilterReducer.sort, stateRedux.pageFilterReducer.search]);

  console.log("stateRedux: ", stateRedux);
  // Xử lý xóa Account
  let onHandleDelete = (id) => {
    console.log("Id của Account cần xóa:", id);
    dispatchRedux(actionDeleteAccountAPI(id));
    setShowNotificationDelete(true);
  };
  // Xử lý khi nhấn nút Edit
  let onHandleEditBtn = (AccountEdit) => {
    console.log("Thông tin của Account cần update:", AccountEdit);
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
    console.log("valueSearch: ", valueSearch);
    dispatchRedux(actionSearch(valueSearch));
  };
  // Xử lý thêm mới Account
  let onHandleCreateNewAccount = (accountNew) => {
    dispatchRedux(actionAddAccountAPI(accountNew));
  };

  // Thông tin trang hiện tại từ redux để truyền xuống PaginationButton hiển thị
  let currentPage = stateRedux.pageFilterReducer;
  return (
    <Container>
      {/* Hiển thị modal form update */}
      <ModalUpdateAccount onHandleUpdateAccount={onHandleUpdateAccount} />
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
        <ToastBody style={{ color: "black", fontSize: 25 }}>Delete Account Success!!</ToastBody>
      </Toast>
      <br />
      <br />
      <br />
      <br />
      {/* Modal thêm mới Account */}
      <ModalCreateNewAccount onHandleCreateNewAccount={onHandleCreateNewAccount} />
      {/* Search dữ liệu */}
      <br />
      <SearchComponent onHandleSearch={onHandleSearch} />
      {/* Form kết quả */}
      <AccountResultForm onHandleEditBtn={onHandleEditBtn} onHandleDelete={onHandleDelete}></AccountResultForm>

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
              <AccountFieldSortButton onHandleChangeFieldSort={onHandleChangeFieldSort} />
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
    </Container>
  );
}

export default AdminPage;
