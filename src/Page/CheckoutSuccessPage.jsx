import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  NavLink,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Rating,
  Item,
  Paper,
  TextField,
  Avatar,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";
import {
  actionGetOrderInfoAPI,
  actionGetOrderItemsAPI,
} from "../Redux/Action/CheckoutAction";
import "../../src/css/CheckoutSuccess.css";
// import { OrderInfo, OrderItems } from "../Redux/Reducer/CheckoutReducer";

const CheckOutSuccess = () => {
  let stateRedux = useSelector((state) => state);
  let navigate = useNavigate();
  let actionRedux = useSelector((action) => action);
  let dispatchRedux = useDispatch();
  let orderState = stateRedux.checkoutReducer;
  let orderItemsState = stateRedux.orderItemsReducer;
  let sessionId = orderState.sessionId;
  let orderId = orderState.id;
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
  console.log("item", orderItemsState);
  // Khai báo item hiển thị dữ liệu
  // Kiểm tra nếu listProduct !="" sẽ hiển thị dữ liệu
  if (orderState.id || orderState.sessionId) {
    return (
      <Container className="checkout_success_container">
        <h1 className="thank">Đặt hàng thành công!</h1>
        <div className="success_paper">
          <h5 style={{padding: "10px"}}>Xin chào {orderState.firstName}</h5>
          <div style={{padding: "10px"}}>Cảm ơn bạn đã tin tưởng Genuine & Dignity.</div>
          <h2 style={{padding: "10px"}}>Mã đơn:</h2>
          <h2 style={{padding: "10px"}}>{orderState.sessionId}</h2>
          <h5>Ngày đặt: {orderState.created_at}</h5>
          <div>Thông tin đơn hàng:</div>
          {orderItemsState.map(
            (item, index) => (
              console.log("item", item.price),
              (
                <List key={index}>
                  <ListItem>
                    <div>
                      <NavLink href={`/products/${item.id}`}>
                        <img
                          alt="Sample"
                          src={
                            "http://localhost:8080/api/v1/fileUpload/files/" +
                            item.imageName
                          }
                        />
                      </NavLink>
                    </div>
                    <span>
                      <ListItemText>
                        <NavLink
                          href={`/products/${item.id}`}
                          style={{ padding: 0 }}
                        >
                          <Typography style={{ fontSize: 20 }}>
                            {item.productName}
                          </Typography>
                        </NavLink>
                        <ListItemText>Giá tiền: {(item.price * 1).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}</ListItemText>
                        {/* <Typography>Giá tiền: {item.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</Typography> */}
                        <Typography>Mô tả: {item.info}</Typography>
                      </ListItemText>
                      <ListItemText>Số lượng: {item.quantity}</ListItemText>
                      <ListItemText>
                        Tổng:
                        {(item.quantity * item.price).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </ListItemText>
                    </span>
                  </ListItem>
                </List>
              )
            )
          )}
        </div>
      </Container>
    );
  } else {
    navigate("/");
  }
};

export default CheckOutSuccess;
