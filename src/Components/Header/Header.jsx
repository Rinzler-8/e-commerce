import React, { useEffect, useState, useRef } from "react";
import { NavLink, Button } from "reactstrap";
import { ListItem, Popover, List, Drawer, Typography, ListItemText, Divider, IconButton, Box } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { styled, useTheme } from "@mui/material/styles";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetCartByUserIdAPI,
  actionAddItemQty,
  actionDecItemQty,
  actionUpdateCartAPI,
  actionDeleteCartItemAPI,
  actionCloseCart,
  actionOpenCart,
} from "../../Redux/Action/CartAction";
import { actionFetchSingleAccountAPI } from "../../Redux/Action/AccountAction";
import { actionFetchCategoryAPI } from "../../Redux/Action/CategoryAction";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { StyledBadge } from "../StyledMUI";
import Backdrop from "@mui/material/Backdrop";

function Header() {
  let [header, setHeader] = React.useState(false);
  let navigate = useNavigate();
  const stateRedux = useSelector((cartItems) => cartItems);
  const cartStateRedux = useSelector((state) => state);
  const dispatchRedux = useDispatch();
  const cart = stateRedux.cartReducer;
  const account = stateRedux.singleAccountReducer;
  const listCategories = stateRedux.listCategoryReducer;
  let drawerIsOpen = cartStateRedux.CartDrawerReducer.isOpen;
  const shoppingCartIconRef = useRef(null);
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  let [anchorEl, setAnchorEl] = React.useState(null);
  let [anchorCat, setAnchorCat] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const openCategories = Boolean(anchorCat);
  let total = 0;

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      // Esc key code
      handleDrawerClose();
    }
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const handleOpenCategories = (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleCloseCategories = () => {
    setAnchorCat(null);
  };

  const handleDrawerOpen = () => {
    dispatchRedux(actionOpenCart());
  };

  const handleDrawerClose = () => {
    dispatchRedux(actionCloseCart());
  };

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

  const removeItem = (cartId, userId) => {
    dispatchRedux(actionDeleteCartItemAPI(cartId, userId));
  };

  const lastCartItem = cart.cartItems[cart.cartItems.length - 1];
  // console.log("cart state", lastCartItem);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const changeNavBack = () => {
    if (window.scrollY >= 90) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };
  window.addEventListener("scroll", changeNavBack);

  useEffect(() => {
    if (id && id !== "") {
      dispatchRedux(actionFetchSingleAccountAPI(id));
    }
    dispatchRedux(actionGetCartByUserIdAPI(id));
    dispatchRedux(actionFetchCategoryAPI());

    //close drawer when hitting "Esc" button on keyboard
    document.addEventListener("keydown", handleKeyDown);

    //hide scrollbar if drawer is opened
    if (drawerIsOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerIsOpen]);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    width: "600px",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));
  return (
    <div className={header ? "header active" : "header"}>
      <div className="header-left">
        <img src={require("../../Assets/img/logowithbackground.png")} alt="logo" />
        <NavLink href="/" className="header-logo-name">
          GENUINE & DIGNITY
        </NavLink>
      </div>
      <div className="header-center">
        {localStorage.getItem("role") == "ADMIN" ? (
          <>
            <NavLink href="/" className="header-center-content">
              TRANG CHỦ
            </NavLink>
            <NavLink href="/products-admin" className="header-center-content" onClick={handleOpenCategories}>
              DANH SÁCH SẢN PHẨM
            </NavLink>
            <NavLink href="/admin" className="header-center-content">
              DANH SÁCH TÀI KHOẢN
            </NavLink>
            <NavLink href="/orders-admin" className="header-center-content">
              DANH SÁCH ĐƠN HÀNG
            </NavLink>
          </>
        ) : (
          <div className="header-center">
            <NavLink href="/" className="header-center-content">
              TRANG CHỦ
            </NavLink>
            <div className="header-center-content" onClick={handleOpenCategories}>
              SẢN PHẨM
            </div>
            <Popover
              id="CategoryPopover"
              open={openCategories}
              onClose={handleCloseCategories}
              anchorEl={anchorCat}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              style={{ zIndex: 9999 }}
            >
              <div className="cat-popover-wrapper">
                {listCategories.map((cat, index) => (
                  <div key={index}>
                    <NavLink href={`/categories/${cat.name}`} className="popover-item">
                      <span>{cat.name}</span>
                    </NavLink>
                  </div>
                ))}
                <NavLink href="/products" className="popover-viewAll">
                  Xem tất cả
                </NavLink>
              </div>
            </Popover>
            <NavLink className="header-center-content">GIỚI THIỆU</NavLink>
            <NavLink className="header-center-content">LIÊN HỆ</NavLink>
          </div>
        )}
      </div>
      <div className="header-right">
        <div className="header-icon-area">
          <button className="style-btn-icon">{/* <SearchIcon/>/ */}</button>
          <span style={{ marginRight: "30px", cursor: "pointer" }}>
            <StyledBadge badgeContent={cart.cartItems.length} max={99} showZero onClick={handleDrawerOpen} ref={shoppingCartIconRef}>
              <ShoppingBagIcon color="inherit" aria-label="open drawer" edge="start" />
            </StyledBadge>

            {/* DRAWER */}
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={drawerIsOpen} onClick={handleDrawerClose}>
              <Drawer
                variant="persistent"
                anchor="right"
                open={drawerIsOpen}
                // transitionDuration={{
                //   enter: "0.8s",
                //   exit: "0.8s",
                // }}
              >
                <DrawerHeader style={{ alignSelf: "start" }}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon />
                    Giỏ hàng ({cart.cartItems.length})
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <div onClick={(e) => {e.stopPropagation()}}>
                  {cart.cartItems.map(
                    (cartProduct, index) => (
                      (total += cartProduct.total_price),
                      cartProduct.quantity >= 1 ? (
                        <Box key={index} className="drawer" style={cartProduct === lastCartItem ? { marginBottom: "120px" } : null}>
                          <List>
                            <ListItem>
                              <div>
                                <div onClick={() => navigate(`/products/${cartProduct.product_id}`)}>
                                  <img alt="Sample" src={"http://localhost:8080/api/v1/fileUpload/files/" + cartProduct.imageName} />
                                </div>
                              </div>
                              <span>
                                <ListItemText onClick={() => navigate(`/products/${cartProduct.product_id}`)}>
                                  <div  style={{ padding: 0 }}>
                                    <div style={{ fontSize: 20 }}>{cartProduct.productName}</div>
                                  </div>
                                  <div>{cartProduct.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</div>
                                  <div>{cartProduct.info}</div>
                                </ListItemText>
                                <span>
                                  <Button onClick={() => decQty(cartProduct)} className="qty_btn">
                                    -
                                  </Button>
                                  <input
                                    type="text"
                                    className="input_qty"
                                    value={cartProduct.quantity}
                                    onChange={(e) => updateQty(id, cartProduct, e)}
                                    size="3"
                                  />
                                  <Button className="qty_btn" onClick={() => addQty(cartProduct)}>
                                    +
                                  </Button>
                                </span>
                                <ListItemText onClick={() => navigate(`/products/${cartProduct.product_id}`)}>Subtotal: {cartProduct.total_price.toLocaleString("vi", { style: "currency", currency: "VND" })}</ListItemText>
                              </span>
                              <div style={{ alignSelf: "start", right: 0, position: "absolute" }}>
                                <IconButton onClick={(e) => removeItem(cartProduct.cart_id, cartProduct.user_id)}>
                                  <DeleteForeverIcon />
                                </IconButton>
                              </div>
                            </ListItem>
                          </List>
                          <Divider />
                        </Box>
                      ) : (
                        removeItem(cartProduct.cart_id, cartProduct.user_id)
                      )
                    )
                  )}
                </div>

                <div className="drawer_footer" onClick={(e) => {e.stopPropagation()}}>
                  <div className="estimated_total">Estimated total: {total.toLocaleString("vi", { style: "currency", currency: "VND" })}</div>
                  <div className="minicart_action">
                    <Button className="checkout" href={"/checkout"}>
                      CHECKOUT
                    </Button>
                  </div>
                </div>
              </Drawer>
            </Backdrop>
          </span>

          {/* ACCOUNT, ORDER, LOGOUT */}
          <div>
            {localStorage.getItem("token") ? (
              <>
                <div className="header-user-avatar" onClick={handleOpenPopover}>
                  <img
                    src={
                      account.urlAvatar
                        ? "http://localhost:8080/api/v1/fileUpload/files/" + account.urlAvatar
                        : require(`../../Assets/img/account-default-img.png`)
                    }
                    alt="logo"
                  />
                  <span className="header-user-name">{username}</span>
                  <KeyboardArrowDownOutlinedIcon />
                </div>
                <Popover
                  id="UserSettingPopover"
                  open={openPopover}
                  onClose={handleClosePopover}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  style={{ zIndex: 9999 }}
                >
                  <div className="user-popover-wrapper">
                    <NavLink className="popover-user" href={`/accounts/${id}`}>
                      <PersonIcon style={{ marginRight: "5px", marginBottom: "5px" }} />
                      <span>Tài khoản</span>
                    </NavLink>
                    <NavLink className="user-popover-footer" href={`/orders`}>
                      <LocalMallIcon style={{ marginRight: "5px", marginBottom: "5px" }} />
                      <span>Đơn hàng</span>
                    </NavLink>
                    <NavLink className="user-popover-footer" onClick={logout}>
                      <LogoutIcon style={{ marginRight: "5px", marginBottom: "5px" }} />
                      <span>Đăng xuất</span>
                    </NavLink>
                  </div>
                </Popover>
              </>
            ) : (
              <div className="header-login">
                <NavLink href="/login" style={{ color: "#0a0f9e" }}>
                  ĐĂNG NHẬP
                </NavLink>
                <NavLink href="/register" style={{ color: "#0a0f9e" }}>
                  ĐĂNG KÝ
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
