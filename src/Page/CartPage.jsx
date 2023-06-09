import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "reactstrap";
import { Table, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Container } from "reactstrap";
import {
  actionGetCartByUserIdAPI,
  actionAddItemQty,
  actionDecItemQty,
  actionUpdateCartAPI,
  actionCloseCart,
} from "../Redux/Action/CartAction";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../../src/css/CartPage.css";
import storage from "../Storage/Storage";

const CartPage = () => {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let cart = stateRedux.cartReducer;
  let id = storage.getItem("id");

  const addQty = (cartItem) => {
    dispatchRedux(actionAddItemQty(cartItem));
    dispatchRedux(actionUpdateCartAPI(id, cartItem));
  };

  const decQty = (cartItem) => {
    dispatchRedux(actionDecItemQty(cartItem));
    dispatchRedux(actionUpdateCartAPI(id, cartItem));
  };

  const updateQty = (id, cartObj, e) => {
    let obj = {
      cart_id: cartObj.cart_id,
      quantity: e.target.value,
      price: cartObj.price * e.target.value,
    };
    console.log("cart quantity: ", obj);
    dispatchRedux(actionUpdateCartAPI(id, obj));
  };

  useEffect(() => {
    if (id && id !== "") dispatchRedux(actionGetCartByUserIdAPI(id));
    dispatchRedux(actionCloseCart());
  }, [id]);
  // Khai báo item hiển thị dữ liệu
  // Kiểm tra nếu listProduct !="" sẽ hiển thị dữ liệu
  if (cart) {
    return (
      <Container className="home">
        <NavLink href={`/products`} className="continue_shopping">
          <ChevronLeftIcon />
          Tiếp tục mua sắm
        </NavLink>
        <span className="your_bag">
          GIỎ HÀNG CỦA BẠN ({cart.cartItems.length})
        </span>
        <TableContainer className="table_container">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{cart.cartItems.length} items</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Số tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((product, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <NavLink href={`/products/${product.productId}`}>
                      <img
                        alt="Sample"
                        src={
                          "http://localhost:8080/api/v1/fileUpload/files/" +
                          product.imageName
                        }
                        style={{ width: 150, height: 200 }}
                      />
                    </NavLink>
                    <div>{product.productName}</div>
                    <div>{product.detail}</div>
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        fontSize: "15px",
                        marginTop: "8px",
                        marginRight: "50px",
                      }}
                    >
                      {product.price}
                    </span>

                    <Button
                      disabled={product.quantity <= 1}
                      onClick={() => decQty(product)}
                      className="qty_btn"
                    >
                      -
                    </Button>
                    <input
                      type="text"
                      className="input_qty"
                      value={product.quantity}
                      onChange={(e) => updateQty(id, product, e)}
                      size="3"
                    />
                    <Button className="qty_btn" onClick={() => addQty(product)}>
                      +
                    </Button>
                  </TableCell>
                  <TableCell>{product.total_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
};

export default CartPage;
