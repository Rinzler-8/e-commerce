import React from "react";
import { Navbar, NavItem, NavLink, Nav, NavbarBrand, CardTitle, CardText, Button } from "reactstrap";
import { CardContent, IconButton, Box, List, ListItem, ListItemButton, ListItemText, Divider, Badge, Drawer, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CartDrawer from "../Components/Cart/CartDrawer";
import { styled, useTheme } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetCartByUserIdAPI, actionAddItemQty, actionDecItemQty, actionUpdateCartAPI, actionDeleteCartItemAPI } from "../Redux/Action/CartAction";
import { useNavigate } from "react-router-dom";
import { updateCartAPI } from "../API/CartAPI";
import "../../src/css/Navbar.css";

function NavReactstrap() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [navbar, setNavBar] = React.useState(false);
  let stateRedux = useSelector((cartItems) => cartItems);
  let dispatchRedux = useDispatch();
  let cart = stateRedux.cartReducer;
  let id = localStorage.getItem("id");

  useEffect(() => {
    if (id && id !== "") dispatchRedux(actionGetCartByUserIdAPI(id));
  }, [id]);

  const changeNavBack = () => {
    if (window.scrollY >= 90) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  window.addEventListener("scroll", changeNavBack);

  const addQty = (cartItem) => {
    dispatchRedux(actionAddItemQty(cartItem));
    dispatchRedux(actionUpdateCartAPI(id, cartItem));
  };

  const decQty = (cartItem) => {
    dispatchRedux(actionDecItemQty(cartItem));
    dispatchRedux(actionUpdateCartAPI(id, cartItem));
  };

  const updateQty = (id, cartObj, e) => {
    let obj = { cart_id: cartObj.cart_id, quantity: e.target.value, price: cartObj.price * e.target.value };
    dispatchRedux(actionUpdateCartAPI(id, obj));
  };

  let total = 0;

  const removeItem = (cartId, userId) => {
    dispatchRedux(actionDeleteCartItemAPI(cartId, userId));
    window.location.reload();
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const drawerWidth = 240;
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return (
    <div
      style={{
        lineHeight: 1,
      }}
    >
      <Navbar className={navbar ? "navbar active" : "navbar"} expand="xl" fixed="top">
        <Nav className="" navbar>
          <NavItem>
            {localStorage.getItem("role") == "ADMIN" && (
              <NavItem>
                <NavLink href="/admin">Account</NavLink>
                <NavLink href="/products-admin">Product Admin</NavLink>
                <NavLink href="/forgotPass">Forgot Password</NavLink>
              </NavItem>  
            )}
          </NavItem>
          <NavItem>
            <NavLink href="/products">Product</NavLink>
          </NavItem>
        </Nav>

        <NavbarBrand className="navBrand" href="/" style={{ fontFamily: "Gill Sans", fontSize: "40px", color: "black" }}>
          GENUINE {"&"} DIGNITY
        </NavbarBrand>

        <Nav className="" navbar>
          {!localStorage.getItem("token") && (
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink href={"/register"}>Register</NavLink>
          </NavItem>
          {/* /////////////////////////////////// */}
          <Badge badgeContent={cart.cartItems.length} color="primary">
            <ShoppingBagOutlinedIcon color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" />
          </Badge>
          <Drawer variant="persistent" anchor="right" open={open}>
            <DrawerHeader style={{ alignSelf: "start"}}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
                Your Bag ({cart.cartItems.length})
              </IconButton>
            </DrawerHeader>
            <Divider />
            {cart.cartItems.map(
              (cartProduct, index) => (
                (total += cartProduct.total_price),
                (
                  <Box key={index} className="drawer">
                    <List>
                      <ListItem>
                        <div>
                          <NavLink href={`/products/${cartProduct.product_id}`}>
                            <img alt="Sample" src= {"http://localhost:8080/api/v1/fileUpload/files/" + cartProduct.imageName} />
                          </NavLink>
                        </div>
                        <span>
                          <ListItemText>
                            <NavLink href={`/products/${cartProduct.product_id}`} style={{ padding: 0 }}>
                              <Typography style={{ fontSize: 20 }}>{cartProduct.productName}</Typography>
                            </NavLink>
                            <Typography>{cartProduct.price}đ</Typography>
                            <Typography>{cartProduct.info}</Typography>
                          </ListItemText>
                          <span>
                            <Button disabled={cartProduct.quantity <= 1} onClick={() => decQty(cartProduct)} className="qty_btn">
                              -
                            </Button>
                            <input type="text" className="input_qty" value={cartProduct.quantity} onChange={(e) => updateQty(id, cartProduct, e)} size="3" />
                            <Button className="qty_btn" onClick={() => addQty(cartProduct)}>
                              +
                            </Button>
                          </span>
                          <ListItemText>Subtotal: {cartProduct.total_price}đ</ListItemText>
                        </span>
                        <span style={{ alignSelf: "start" }}>
                          <IconButton onClick={() => removeItem(cartProduct.cart_id, cartProduct.user_id)}>
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        </span>
                      </ListItem>
                    </List>
                    <Divider />
                  </Box>
                )
              )
            )}
            <div className="drawer_footer">
              <div>Estimated total: {total}đ</div>
              <span className="minicart_action">
                <Button className="view_cart" href={"/cart"}>
                  VIEW CART
                </Button>
                <Button className="checkout" href={"/checkout"}>
                  CHECKOUT
                </Button>
              </span>
            </div>
          </Drawer>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavReactstrap;
