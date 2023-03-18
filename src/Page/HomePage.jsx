import React, { useEffect } from "react";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg, NavLink, Container } from "reactstrap";
import Carousels from "../Components/Home/Carousel";
import Footer from "../Components/Home/Footer";
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
      {/* Carousels */}
      {/* {<Carousels />} */}
      <Row className="home">
        <Col
          className="h4"
          md={{
            offset: 3,
            size: 6,
          }}
          sm="12"
        >
          <h4>SHOP AWARD-WINNING FAVORITES</h4>
        </Col>
      </Row>
      <Grid container spacing={2}>
        {listProduct.map((product, index) => (
          <Col className="bg" sm="4" xs="6" key={index} align="center">
            <Box>
              <NavLink href={`/products/${product.product_id}`}>
                <img alt="Sample" src= {"http://localhost:8080/api/v1/fileUpload/files/" + product.imageName} />
                <CardBody>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {product.detail}
                  </CardSubtitle>
                  <CardText>{product.info}</CardText>
                  <CardText>{product.price}</CardText>
                </CardBody>
              </NavLink>
            </Box>
            <Button color="primary" onClick={() => handleAddToCart(id, product)}>
              Add to cart
            </Button>
          </Col>
        ))}
      </Grid>

      {/* <ProductList /> */}
      <br></br>

      <Row>
        <Col className="h4" sm="12">
          <Card>
            <CardImg
              alt="Card image cap"
              src="Cube.png"
              style={{
                height: 200,
              }}
              width="100%"
            ></CardImg>
          </Card>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}

export default HomePage;
