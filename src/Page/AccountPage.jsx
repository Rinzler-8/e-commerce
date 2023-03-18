import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Box, Typography, Rating, Item, Paper, TextField, Avatar, ListItemText, ListItem, List } from "@mui/material";
import { actionFetchSingleAccountAPI } from "../Redux/Action/AccountAction";
import "../../src/css/CheckoutSuccess.css";

const AccountPage = () => {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let account = stateRedux.singleAccountReducer;
  let id = localStorage.getItem("id");
  useEffect(() => {
    if (id && id !== "") {
      dispatchRedux(actionFetchSingleAccountAPI(id));
    }
  }, [id]);

  // Khai báo item hiển thị dữ liệu
  // Kiểm tra nếu listProduct !="" sẽ hiển thị dữ liệu
  // if (orderState) {
  return (
    <Container className="checkout_success_container">
      <div className="success_paper">
              <span>
                    <Typography style={{ fontSize: 20 }}>{account.username}</Typography>
                  <Typography>{account.email}đ</Typography>
              </span>
      </div>
    </Container>
  );
  // }
};

export default AccountPage;
