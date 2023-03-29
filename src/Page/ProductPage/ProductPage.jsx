import React from "react";
import ProductItem from "../../Components/Product/ProductItem";
import "./ProductPage.css";
import { Progress } from "reactstrap";

function ProductPage(props) {
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
        <p className="progress-bar-description">Bạn đang xem 24 trên tổng số 48 sản phẩm</p>
        <Progress color="primary" value={57} className="progress-bar-custom-style" />
        <button className="btn-show-more">Tải thêm</button>
      </div>
    </>
  );
}

export default ProductPage;
