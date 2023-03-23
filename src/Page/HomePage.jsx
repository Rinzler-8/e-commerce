import React, { useEffect } from "react";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg, NavLink, Container } from "reactstrap";
import CarouselHome from "../Components/Home/CarouselHome";
import "../css/style.css";
import { Card, CardContent, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchProductAPI } from "../Redux/Action/ProductAction";
import Product from "../Components/Product/Product";
import ProductList from "../Components/Product/ProductList";
import { actionAddToCartAPI } from "../Redux/Action/CartAction";
import "../../src/css/HomePage.css";

function HomePage() {
  let dispatchRedux = useDispatch();
  let stateRedux = useSelector((state) => state);
  let listProduct = stateRedux.listProductReducer;
  let id = localStorage.getItem("id");
  const handleAddToCart = (id, cartItem) => {
    let obj = {
      quantity: 1,
      price: cartItem.price,
      product_id: cartItem.product_id,
    };
    dispatchRedux(actionAddToCartAPI(id, obj));
    alert("Them san pham vao gio thanh cong");
    window.location.reload();
  };
  useEffect(() => {
    dispatchRedux(actionFetchProductAPI());
  }, []);
  return (
    <>
      <div className="homepage-carousel-container">
        <CarouselHome />
      </div>
      <div className="product-list-container">
        <div className="product-list-title">SẢN PHẨM BÁN CHẠY</div>
        <div className="list-item-container">
        {listProduct.map((product, index) => (
          <Col className="bg" sm="4" xs="6" key={index} align="center">
            <Box className="productItem-container">
              <NavLink href={`/products/${product.product_id}`}>
                <img className="productItem-img" alt="Sample" src={"http://localhost:8080/api/v1/fileUpload/files/" + product.imageName} />
                <CardBody className="productItem-information">
                  <CardTitle tag="h5" style = {{color :"black", fontFamily: "Lucida Sans, sans-serif"}}>{product.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {product.info}
                  </CardSubtitle>
                  <CardText style = {{color :"black"}}>{product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</CardText>
                  <CardText style = {{color :"black"}}>(Giá tham khảo)</CardText>
                </CardBody>
              </NavLink>
            </Box>
            <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
          </Col>
        ))}
      </div>
      </div>
    </>
  );
}

export default HomePage;
