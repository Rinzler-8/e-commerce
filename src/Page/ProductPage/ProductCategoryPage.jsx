import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../Components/Product/ProductItem";
import { actionChangeSize } from "../../Redux/Action/PageAction";
import {  } from "../../Redux/Action/CategoryAction";
import { actionFetchProductByCatAPI } from "../../Redux/Action/ProductAction";
import LoadMoreButton from "../../Components/Paging/LoadMoreButton";
import "./ProductPage.css";
import { Progress } from "reactstrap";
import { useParams } from "react-router-dom";

function ProductCategoryPage(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let param = useParams();
  let totalProd = stateRedux.pageFilterReducer.totalElements;
  let listProduct = stateRedux.listProductReducer;
  useEffect(() => {
    dispatchRedux(actionFetchProductByCatAPI(param.id));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [stateRedux.pageFilterReducer.page, stateRedux.pageFilterReducer.size, stateRedux.pageFilterReducer.sort, stateRedux.pageFilterReducer.search, param.id]);
  // Hàm xử lý khi người dùng ChangeSize
  let onHandleChangeSize = (item) => {
    console.log("Size: ", item);
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
        {listProduct.length < totalProd ? <LoadMoreButton onHandleChangeSize={onHandleChangeSize} /> : <></>}
      </div>
    </>
  );
}

export default ProductCategoryPage;
