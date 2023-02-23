import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Card, CardContent, Grid, Box } from "@mui/material";
import { Container } from "reactstrap";
import { useEffect } from "react";
import { actionFetchSingleProductAPI } from "../../Redux/Action/ProductAction";
import { actionAddToCartAPI } from "../../Redux/Action/CartAction";

function Product(props) {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let listProduct = stateRedux.listProductReducer;
  let product = stateRedux.singleProductReducer;
  const handleAddToCart = (id, cartItem) => {
    dispatchRedux(actionAddToCartAPI(id, cartItem));
    alert("Them san pham vao gio thanh cong");
    window.location.reload();
  };
  let {id} = useParams();
  // let product = listProduct.find((product) => product.id == id);
  let { name, info, price,detail, imageName } = product;
  useEffect(() => {
    if (id && id !== "")
    dispatchRedux(actionFetchSingleProductAPI(id));
  }, [id])
  if (listProduct) {
    return (
      <Col sm="4" style={{ padding: 30 }} key={product.id}>
        <Box>
          <img alt="Sample" src={imageName} style={{ paddingTop: 30 }} />
          <CardContent>
            <CardTitle tag="h5">{name}</CardTitle>
            <CardText>{price}</CardText>
            <CardText>{info}</CardText>
            <CardText>{detail}</CardText>
          </CardContent>
        </Box>
        <Button color="primary" onClick={() => handleAddToCart(id, product)}>
              Add to cart
            </Button>
    </Col>  
    )
  }
}

export default Product;
