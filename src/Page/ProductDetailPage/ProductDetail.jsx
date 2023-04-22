import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Card, CardContent, Grid, Box, Button } from "@mui/material";
import { Container } from "reactstrap";
import { actionFetchSingleProductAPI } from "../../Redux/Action/ProductAction";
import {
  actionAddToCartAPI,
  actionAddItemQty,
  actionDecItemQty,
  actionUpdateCartAPI,
  actionCloseCart,
  actionOpenCart,
  actionUpdateCartQty,
} from "../../Redux/Action/CartAction";
import "./ProductDetail.css";
import queryString from "query-string";

function ProductDetail(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  const cart = stateRedux.cartReducer;
  let product = stateRedux.singleProductReducer;
  let id = localStorage.getItem("id");
  let prodId = useParams();
  const [qty, setQty] = useState(1);
  const handleAddToCart = (id, cartItem) => {
    const existingItem = cart.cartItems.find((item) => item.product_id === cartItem.product_id);
    if (existingItem) {
      existingItem.quantity += 1;
      dispatchRedux(actionUpdateCartAPI(id, existingItem));
    } else {
      const newCartItem = {
        quantity: 1,
        price: cartItem.price,
        product_id: cartItem.product_id,
      };
      dispatchRedux(actionAddToCartAPI(id, newCartItem));
      dispatchRedux(actionUpdateCartQty(1));
    }
    dispatchRedux(actionOpenCart());
  };
  useEffect(() => {
    dispatchRedux(actionFetchSingleProductAPI(prodId.id));
  }, [prodId.id]);

  // useEffect(() => {
  //   dispatchRedux(actionCloseCart());
  // }, []);
  // dispatchRedux(actionFetchSingleProductAPI(prodId.id));
  return (
    <Col sm="4" style={{ padding: 30 }}>
      <Box>
        {/* <img alt="Sample" src= {require('../../Assets/Product/' + product.imageName)} style={{ paddingTop: 30 }} /> */}
        <img alt="Sample" src={"http://localhost:8080/api/v1/fileUpload/files/" + product.imageName} style={{ paddingTop: 30 }} />
        <CardBody>
          <CardTitle tag="h5">{product.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {product.info}
          </CardSubtitle>
          <CardText>{product.detail}</CardText>
          {/* <CardText>{product.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</CardText> */}
        </CardBody>
        <span>
          <Button disabled={qty <= 1} onClick={() => setQty(qty - 1)}>
            -
          </Button>
          <input type="text" className="input_qty" value={qty} />
          <Button onClick={() => setQty(qty + 1)}>+</Button>
        </span>
      </Box>
      <Button color="primary" onClick={() => handleAddToCart(id, product)}>
        Add to cart
      </Button>
    </Col>
  );
}

export default ProductDetail;
