import React from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = () => {
  return (
    <>
      <div className="product-list-title">SẢN PHẨM BÁN CHẠY</div>
      <div className="list-item-container">
        <ProductItem></ProductItem>
      </div>
    </>
  );

};

export default ProductList;
