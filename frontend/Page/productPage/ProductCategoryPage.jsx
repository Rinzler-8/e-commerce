import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductItem from "../../Components/Product/ProductItem";
import { actionChangeSize } from "../../redux/Action/PageAction";
import {} from "../../redux/Action/CategoryAction";
import { actionFetchProductByCatAPI } from "../../redux/Action/ProductAction";
import LoadMoreButton from "../../Components/Paging/LoadMoreButton";
import "./ProductPage.scss";
import { Progress } from "reactstrap";
import { useParams } from "react-router-dom";
import productPageBanner from "../../Assets/img/product-page-banner.png";
import AppContext from "../../AppContext";

function ProductCategoryPage(props) {
  let stateRedux = useSelector((state) => state);
  const { dispatchRedux } = useContext(AppContext);
  let param = useParams();
  let totalProd = stateRedux.pageFilterReducer.totalElements;
  let listProduct = stateRedux.listProductReducer;
  useEffect(() => {
    dispatchRedux(actionFetchProductByCatAPI(param.id));
  }, [
    stateRedux.pageFilterReducer.page,
    stateRedux.pageFilterReducer.size,
    stateRedux.pageFilterReducer.sort,
    stateRedux.pageFilterReducer.search,
    param.id,
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
        {listProduct.length < totalProd ? (
          <LoadMoreButton onHandleChangeSize={onHandleChangeSize} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ProductCategoryPage;
