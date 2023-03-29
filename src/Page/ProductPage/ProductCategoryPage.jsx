import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationButton from "../../Components/Paging/PaginationButton";
import SizeButton from "../../Components/Paging/SizeButton";
import ProductFieldSortButton from "../../Components/Paging/ProductFieldSortButton";
import DirectionSortButton from "../../Components/Paging/DirectionSortButton";
import SearchComponent from "../../Components/SearchComponent/SearchComponent";
import ProductItem from "../../Components/Product/ProductItem";
import { actionChangePage, actionChangeSize, actionChangeSortDirection, actionChangeSortField, actionSearch } from "../../Redux/Action/PageAction";
import { actionFetchCategoryAPI } from "../../Redux/Action/CategoryAction";
import { actionAddProductAPI, actionDeleteProductAPI, actionFetchProductAPI, actionUpdateProductAPI, actionFetchSingleProductAPI } from "../../Redux/Action/ProductAction";
import ProductList from "../../Components/Product/ProductList";
// import ProductList from "../../Components/Product/ProductList";
import "./ProductPage.css";
import { Progress } from "reactstrap";
import { useParams } from 'react-router-dom';

function ProductCategoryPage(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let param = useParams();
  console.log("param: ",param.id)
  let filter = {
    page: stateRedux.pageFilterReducer.page,
    size: stateRedux.pageFilterReducer.size,
    sort: stateRedux.pageFilterReducer.sort,
    search: stateRedux.pageFilterReducer.search,
  };
  useEffect(() => {
    dispatchRedux(actionFetchProductAPI(filter));
    dispatchRedux(actionFetchCategoryAPI());
    dispatchRedux(actionSearch(param.id));
    // Gọi useEffect để load dữ liệu list Department và Positon
  }, [stateRedux.pageFilterReducer.page, stateRedux.pageFilterReducer.size, stateRedux.pageFilterReducer.sort, stateRedux.pageFilterReducer.search]);
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
  return (
    <>
      <div className="product-page-banner">
        <img src={require("../../Assets/img/product-page-banner.png")} alt="banner" />
      </div>
      <div className="product-page-content">
        <div className="product-page-item-cotainer">
          <div className="product-item-wrapper">
            {/* <ProductList></ProductList> */}
            <ProductList></ProductList>
          </div>
        </div>
      </div>
      <div className="product-page-progress-bar-container">
        <p className="progress-bar-description">Bạn đang xem 24 trên tổng số 48 sản phẩm</p>
        <Progress color="primary" value={57} className="progress-bar-custom-style" />
        <button className="btn-show-more">Tải thêm</button>
      </div>
    </>
  );
}

export default ProductCategoryPage;
