import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, NavLink, InputGroup, InputGroupText } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Box, Typography, Rating, Table, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Container } from "reactstrap";
import { actionGetCartByUserIdAPI, actionAddItemQty, actionDecItemQty, actionUpdateCartAPI, actionDeleteCartItemAPI } from "../Redux/Action/CartAction";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../../src/css/CartPage.css";

const CartPage = () => {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let cart = stateRedux.cartReducer;
  let id = localStorage.getItem("id");
  const [qty, setQty] = useState(1);
  const changeQty = (e) => {
    let val = parseInt(e.target.value);
    setQty(val);
  };
  const updateQty = (id, cartObj, e) => {
    let obj = { cart_id: cartObj.cart_id, quantity: e.target.value, price: cartObj.price * e.target.value };
    setQty(obj.quantity);
    dispatchRedux(actionUpdateCartAPI(id, obj));
  };

  const removeItem = (cartId, userId) => {
    dispatchRedux(actionDeleteCartItemAPI(cartId, userId));
    window.location.reload();
  };
  
  useEffect(() => {
    if (id && id !== "") dispatchRedux(actionGetCartByUserIdAPI(id));
  }, [id]);
  // Khai báo item hiển thị dữ liệu
  // Kiểm tra nếu listProduct !="" sẽ hiển thị dữ liệu
  if (cart) {
    return (
      <Container className="home">
        <NavLink href={`/products`} className="continue_shopping">
          <ChevronLeftIcon />
          Continue Shopping
        </NavLink>
        <span className="your_bag">YOUR BAG ({cart.cartItems.length})</span>
        <TableContainer className="table_container">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{cart.cartItems.length} items</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((product, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <NavLink href={`/products/${product.product_id}`}>
                      <img alt="Sample" src={product.imageName} style={{ width: 150, height: 200 }} />
                    </NavLink>
                    <div>{product.productName}</div>
                    <div>{product.detail}</div>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontSize: "15px", marginTop: "8px", marginRight: "50px"}}>{product.price}</span>

                    <Button disabled={qty <= 1} onClick={() => setQty(qty - 1)} className = 'qty_btn'>
                      -
                    </Button>
                    <input type="text" className="input_qty" value={qty} onChange={(e) => updateQty(id, product, e)} size="3"/>
                    <Button className = 'qty_btn' onClick={() => setQty(qty + 1)}>
                      +
                    </Button>
                  </TableCell>
                  <TableCell>{product.price * qty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <Box>
            <NavLink to={`/products/${product.product_id}`}>
              <img alt="Sample" src={product.imageName} style={{ paddingTop: 30 }} />
              <CardContent>
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardText>{product.price}</CardText>
                <CardText>{product.info}</CardText>
                <CardText>{product.detail}</CardText>
              </CardContent>
            </NavLink>
          </Box> */}
          </Table>
        </TableContainer>
      </Container>
    );
  }
};

export default CartPage;