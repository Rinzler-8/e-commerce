import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { Card, CardContent, Grid, Box, Typography, Rating } from "@mui/material";
import { Container } from "reactstrap";
import { actionGetCartByUserIdAPI, actionAddItemQty, actionDecItemQty, actionUpdateCartAPI } from "../Redux/Action/CartAction";

const CheckOutList = () => {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let cart = stateRedux.cartReducer;
  let id = localStorage.getItem("id");
  useEffect(() => {
    if (id && id !== "") dispatchRedux(actionGetCartByUserIdAPI(id));
  }, [id]);
  // Khai báo item hiển thị dữ liệu
  // Kiểm tra nếu listProduct !="" sẽ hiển thị dữ liệu
  if (cart) {
    return (
      <Grid container >
        {cart.cartItems.map((product, index) => (
          <Col className="bg" sm="4" xs="6" key={index} align="center">
            <Box>
              <NavLink to={`/products/${product.product_id}`}>
                <img alt="Sample" src={product.imageName} style={{ paddingTop: 30 }} />
                <CardContent>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                  <CardText>{product.price}</CardText>
                  <CardText>{product.info}</CardText>
                  <CardText>{product.detail}</CardText>
                </CardContent>
              </NavLink>
            </Box>
          </Col>
        ))}
      </Grid>
    );
  }
};

export default CheckOutList;
