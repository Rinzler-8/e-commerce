import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Card, CardContent, Grid, Box, Button } from "@mui/material";
import { Container } from "reactstrap";
import { useEffect } from "react";
import { actionFetchSingleProductAPI } from "../../Redux/Action/ProductAction";
import { actionAddToCartAPI, actionAddItemQty, actionDecItemQty, actionUpdateCartAPI } from "../../Redux/Action/CartAction";
import "../../../src/css/ProductDetailPage.css";

function ProductDetail(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let product = stateRedux.singleProductReducer;
  let id = localStorage.getItem("id");
  let prodId = useParams();
  const [qty, setQty] = useState(1);
  const handleAddToCart = (id, cartItem) => {
    let obj = {
      quantity: qty,
      price: cartItem.price,
      product_id: cartItem.product_id,
    };
    dispatchRedux(actionAddToCartAPI(id, obj));
    alert("Them san pham vao gio thanh cong");
    window.location.reload();
  };
  useEffect(() => {
    if (id && id !== "") dispatchRedux(actionFetchSingleProductAPI(prodId.id));
  }, [id]);
  return (
    <Col sm="4" style={{ padding: 30 }}>
      <Box>
        <img alt="Sample" src={product.imageName} style={{ paddingTop: 30 }} />
        <CardBody>
          <CardTitle tag="h5">{product.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {product.detail}
          </CardSubtitle>
          <CardText>{product.info}</CardText>
          <CardText>{product.price}</CardText>
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
