import React from "react";
import { Navbar, NavItem, NavLink, Nav, NavbarBrand, CardTitle, CardText, Button } from "reactstrap";
import { CardContent, IconButton, Box } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CartDrawer from "../Components/Cart/CartDrawer";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Badge from "@mui/material/Badge";
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
  }
  window.addEventListener('scroll', changeNavBack);

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
    console.log("totalPrice: ", cartObj.price * e.currentTarget.value);
    console.log("OBject: ", obj);
  };

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
            <NavLink href="/admin">Account</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/products">Product</NavLink>
          </NavItem>
        </Nav>

        {/* <NavbarBrand className="mx-auto" href="/" style={{ fontFamily: "Gill Sans", fontSize: "40px" , color: "black" }}> */}
        <NavbarBrand className="navBrand" href="/" style={{ fontFamily: "Gill Sans", fontSize: "40px" , color: "black" }}>
          GENUINE {"&"} DIGNITY
        </NavbarBrand>

        <Nav className="" navbar>
          {!localStorage.getItem("token") && (
            <NavItem>
              <NavLink href={"/login"}>Login</NavLink>
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
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose} style={{ marginRight: "400px" }}>
                <ChevronRightIcon />
                Your Bag
              </IconButton>
              <div>{cart.cartItems.length} ITEMS</div>
            </DrawerHeader>
            <Divider />

            {cart.cartItems.map((cartProduct, index) => (
              <Box key={index}>
                <NavLink href={`/products/${cartProduct.product_id}`}>
                  <CardContent align="center">
                    <img alt="Sample" src={cartProduct.imageName} style={{ paddingTop: 30 }} />
                    <CardTitle tag="h5">{cartProduct.productName}</CardTitle>
                    <CardText>{cartProduct.info}</CardText>
                    <CardText>{cartProduct.detail}</CardText>
                    <CardText>{cartProduct.price}</CardText>
                  </CardContent>
                </NavLink>
                <span>
                  <Button disabled={cartProduct.quantity <= 1} onClick={() => decQty(cartProduct)}>
                    -
                  </Button>
                  <input type="text" className="text-center" placeholder={cartProduct.quantity} onBlur={(e) => updateQty(id, cartProduct, e)} />
                  <Button onClick={() => addQty(cartProduct)}>+</Button>
                  <CardText>{cartProduct.total_price}đ</CardText>
                </span>
                <Button onClick={() => removeItem(cartProduct.cart_id, cartProduct.user_id)} color="danger">
                  Remove
                </Button>

                <Divider />
              </Box>
            ))}
            <span>
              <Button color="primary" href={"/cart"}>
                VIEW CART
              </Button>
              <Button color="primary" href={"/checkout"}>
                CHECKOUT
              </Button>
            </span>
          </Drawer>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavReactstrap;
