import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../Components/Product/ProductItem";
import { actionChangeSize} from "../../Redux/Action/PageAction";
import { actionFetchCategoryAPI } from "../../Redux/Action/CategoryAction";
import {
  actionFetchProductAPI,
} from "../../Redux/Action/ProductAction";
import "./ProductPage.css";
import { Progress } from "reactstrap";

function ProductPage(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let size = stateRedux.pageFilterReducer.size;
  let listProduct = stateRedux.listProductReducer;
  let totalProd = stateRedux.pageFilterReducer.totalElements;
  // Lấy dữ liệu page, size được quản lý từ Redux
  let filter = {
    page: stateRedux.pageFilterReducer.page,
    size: stateRedux.pageFilterReducer.size,
    sort: stateRedux.pageFilterReducer.sort,
    search: stateRedux.pageFilterReducer.search,
  };

  window.onscroll = function () {
    if (window.innerHeight + Math.ceil(window.pageYOffset) >= document.body.offsetHeight - 300) {
      let s = size + 6;
      onHandleChangeSize(s);
    }
  };
  //gọi useEffect để load dữ liệu, chỉ gọi khi các state page hoặc size, ... từ redux thay đổi
  useEffect(() => {
    dispatchRedux(actionFetchProductAPI(filter));
    dispatchRedux(actionFetchCategoryAPI());
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [stateRedux.pageFilterReducer.page, stateRedux.pageFilterReducer.size, stateRedux.pageFilterReducer.sort, stateRedux.pageFilterReducer.search]);

  // Hàm xử lý khi người dùng ChangeSize
  let onHandleChangeSize = (item) => {
    dispatchRedux(actionChangeSize(item));
  };

  return (
    <>
      <div className="product-page-banner">
        <img src={require("../../Assets/img/product-page-banner.png")} alt="banner" />
      </div>
      <div className="product-page-content">
        <div className="product-page-item-cotainer">
          <ProductItem></ProductItem>
        </div>
      </div>
      <div className="product-page-progress-bar-container">
        <p className="progress-bar-description">
          Bạn đang xem {listProduct.length} trên tổng số {totalProd} sản phẩm
        </p>
        <Progress color="primary" value={listProduct.length} max={totalProd} className="progress-bar-custom-style" />
        {/* {listProduct.length < totalProd ? <LoadMoreButton onHandleChangeSize={onHandleChangeSize} /> : <></>} */}
      </div>
    </>
  );
}

export default ProductPage;
