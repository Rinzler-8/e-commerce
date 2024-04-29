import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductItem from "../../components/product/ProductItem";
import { actionChangeSize } from "../../redux/Action/PageAction";

import { actionFetchProductAPI } from "../../redux/Action/ProductAction";
import "./ProductPage.scss";
import { Progress } from "reactstrap";
import productPageBanner from "../../Assets/img/product-page-banner.png";
import AppContext from "../../AppContext";

function ProductPage(props) {
  let stateRedux = useSelector((state) => state);
  const { dispatchRedux } = useContext(AppContext);
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
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight - 300
    ) {
      let s = size + 6;
      onHandleChangeSize(s);
    }
  };
  //gọi useEffect để load dữ liệu, chỉ gọi khi các state page hoặc size, ... từ redux thay đổi
  useEffect(() => {
    dispatchRedux(actionFetchProductAPI(filter));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [
    stateRedux.pageFilterReducer.page,
    stateRedux.pageFilterReducer.size,
    stateRedux.pageFilterReducer.sort,
    stateRedux.pageFilterReducer.search,
  ]);

  // Hàm xử lý khi người dùng ChangeSize
  let onHandleChangeSize = (item) => {
    dispatchRedux(actionChangeSize(item));
  };

  return (
    <>
      <div className="product-page-banner">
        <img src={productPageBanner} alt="banner" />
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
        <Progress
          color="primary"
          value={listProduct.length}
          max={totalProd}
          className="progress-bar-custom-style"
        />
        {/* {listProduct.length < totalProd ? <LoadMoreButton onHandleChangeSize={onHandleChangeSize} /> : <></>} */}
      </div>
    </>
  );
}

export default ProductPage;
