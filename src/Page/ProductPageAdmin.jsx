import React, { useEffect } from "react";
// import CreateButton from "./../Components/Admin/CreateButton";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchProductAPI} from "../Redux/Action/ProductAction";
import { actionFetchCategoryAPI } from "../Redux/Action/CategoryAction";
import MenuBar from "../Components/Admin/MenuBar/MenuBar";
import ManageProduct from "../Components/Admin/ManageProduct/ManageProduct";

function ProductPageAdmin(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  // State quản lý đóng mở thông báo.
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
    dispatchRedux(actionFetchCategoryAPI());
    // dispatchRedux(actionChangeSize(filter.size));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [stateRedux.pageFilterReducer.page, stateRedux.pageFilterReducer.size, stateRedux.pageFilterReducer.sort, stateRedux.pageFilterReducer.search]);


  return (
    <div className="admin-page-container">
      <MenuBar/>
      <div className="content-area-admin">
        <ManageProduct/>
      </div>
    </div>
  );
}

export default ProductPageAdmin;
