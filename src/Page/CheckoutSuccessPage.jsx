import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Box, Typography, Rating, Item, Paper, TextField, Avatar, ListItemText, ListItem, List } from "@mui/material";
import { actionGetOrderInfoAPI, actionGetOrderItemsAPI } from "../Redux/Action/CheckoutAction";
import "../../src/css/CheckoutSuccess.css";
// import { OrderInfo, OrderItems } from "../Redux/Reducer/CheckoutReducer";

const CheckOutSuccess = () => {
  let stateRedux = useSelector((state) => state);
  let actionRedux = useSelector((action) => action);
  let dispatchRedux = useDispatch();
  let orderState = stateRedux.checkoutReducer;
  let orderItemsState = stateRedux.orderItemsReducer;
  let sessionId = orderState.session_id;
  let orderId = orderState.order_id;
  useEffect(() => {
    if (orderId && orderId !== "") {
      dispatchRedux(actionGetOrderInfoAPI(orderId));
    }
  }, [orderId]);
  useEffect(() => {
    if (sessionId && sessionId !== "") {
      dispatchRedux(actionGetOrderItemsAPI(sessionId));
    }
  }, [sessionId]);

  // Khai báo item hiển thị dữ liệu
  // Kiểm tra nếu listProduct !="" sẽ hiển thị dữ liệu
  // if (orderState) {
  return (
    <Container className="checkout_success_container">
      <h1 className="thank">Thank you for your purchase!</h1>
      <div className="success_paper">
        <h5>Hi {orderState.first_name}</h5>
        <div>Thanks for your purchase from Genuine & Dignity.</div>
        <h2>INVOICE ID:</h2>
        <h2>{orderState.session_id}</h2>
        <div>YOUR ORDER INFORMATION:</div>
        <hr />
        <h5>Order ID: {orderState.order_id}</h5>
        <h5>Order Date: {orderState.created_at}</h5>
        <h5>HERE'S WHAT YOU ORDERED:</h5>
        {orderItemsState.map((item, index) => (
          <List key={index}>
            <ListItem>
              <div>
                <NavLink href={`/products/${item.product_id}`}>
                  <img alt="Sample" src= {"http://localhost:8080/api/v1/fileUpload/files/" + item.imageName} />
                </NavLink>
              </div>
              <span>
                <ListItemText>
                  <NavLink href={`/products/${item.product_id}`} style={{ padding: 0 }}>
                    <Typography style={{ fontSize: 20 }}>{item.productName}</Typography>
                  </NavLink>
                  <Typography>{item.price}đ</Typography>
                  <Typography>{item.info}đ</Typography>
                </ListItemText>
                <ListItemText>Subtotal: {item.total_price}đ</ListItemText>
              </span>
            </ListItem>
          </List>
        ))}
      </div>
    </Container>
  );
  // }
};

export default CheckOutSuccess;
