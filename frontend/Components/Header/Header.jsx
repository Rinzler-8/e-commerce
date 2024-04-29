import React, { useEffect, useContext, useTransition } from "react";
import { NavLink, Button } from "reactstrap";
import {
  ListItem,
  Popover,
  List,
  Drawer,
  ListItemText,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import {
  actionGetCartByUserIdAPI,
  actionAddItemQty,
  actionDecItemQty,
  actionUpdateCartAPI,
  actionDeleteCartItemAPI,
  actionCloseCart,
  actionOpenCart,
} from "../../redux/Action/CartAction";
import { actionFetchSingleAccountAPI } from "../../redux/Action/AccountAction";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { StyledBadge } from "../StyledMUI";
import Backdrop from "@mui/material/Backdrop";
import AppContext from "../../AppContext";
import KeyIcon from "@mui/icons-material/Key";
import storage from "../../Storage/Storage";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./Menu";

function Header() {
  let [header, setHeader] = React.useState(false);
  let navigate = useNavigate();
  const stateRedux = useSelector((cartItems) => cartItems);
  const cart = stateRedux.cartReducer;
  const account = stateRedux.singleAccountReducer;
  const id = storage.getItem("id");
  const username = storage.getItem("username");
  let [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const {
    drawerIsOpen,
    logoBackground,
    accountDefaultImg,
    dispatchRedux,
    startTransition,
  } = useContext(AppContext);
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
    let obj = {
      cart_id: cartObj.cart_id,
      quantity: e.target.value,
      price: cartObj.price * e.target.value,
    };
    dispatchRedux(actionUpdateCartAPI(id, obj));
  };

  const removeItem = (cartId, userId) => {
    dispatchRedux(actionDeleteCartItemAPI(cartId, userId));
  };

  const lastCartItem = cart.cartItems[cart.cartItems.length - 1];
  // console.log("cart state", lastCartItem);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // window.location.reload();
    navigate(`/`);
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
    <>
      <div className={header ? "header active" : "header"}>
        <MenuIcon id="menu"></MenuIcon>

        <div className="header-left">
          {/* <Popover></Popover> */}
          <img src={logoBackground} alt="logo" />
          <NavLink href="/" className="header-logo-name">
            GENUINE & DIGNITY
          </NavLink>
        </div>
        <Menu />
        <div className="header-right">
          <div className="header-icon-area">
            {/* <button className="style-btn-icon"><SearchIcon/>/</button> */}
            <span style={{ marginRight: "30px", cursor: "pointer" }}>
              <StyledBadge
                badgeContent={cart.cartItems.length}
                max={99}
                showZero
                onClick={handleDrawerOpen}
              >
                <ShoppingBagIcon
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                />
              </StyledBadge>

              {/* DRAWER */}
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={drawerIsOpen}
                onClick={handleDrawerClose}
              >
                <Drawer
                  variant="persistent"
                  anchor="right"
                  open={drawerIsOpen}
                  // transitionDuration={{
                  //   enter: "0.8s",
                  //   exit: "0.8s",
                  // }}
                  style={{ cursor: "default" }}
                >
                  <DrawerHeader style={{ alignSelf: "start" }}>
                    <IconButton onClick={handleDrawerClose}>
                      <ChevronRightIcon />
                      Giỏ hàng ({cart.cartItems.length})
                    </IconButton>
                  </DrawerHeader>
                  <Divider />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {cart.cartItems.map(
                      (cartProduct, index) => (
                        (total += cartProduct.total_price),
                        cartProduct.quantity >= 1 ? (
                          <Box
                            key={index}
                            className="drawer"
                            style={
                              cartProduct === lastCartItem
                                ? { marginBottom: "120px" }
                                : null
                            }
                          >
                            <List>
                              <ListItem>
                                <div>
                                  <div
                                    onClick={() =>
                                      navigate(
                                        `/products/${cartProduct.productId}`
                                      )
                                    }
                                  >
                                    <img
                                      alt="Sample"
                                      src={
                                        "http://localhost:8080/api/v1/fileUpload/files/" +
                                        cartProduct.imageName
                                      }
                                    />
                                  </div>
                                </div>
                                <span>
                                  <ListItemText
                                    onClick={() =>
                                      navigate(
                                        `/products/${cartProduct.productId}`
                                      )
                                    }
                                  >
                                    <div style={{ padding: 0 }}>
                                      <div style={{ fontSize: 20 }}>
                                        {cartProduct.productName}
                                      </div>
                                    </div>
                                    <div>
                                      {cartProduct.price.toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </div>
                                    <div>{cartProduct.info}</div>
                                  </ListItemText>
                                  <span>
                                    <Button
                                      onClick={() => decQty(cartProduct)}
                                      className="qty_btn"
                                    >
                                      -
                                    </Button>
                                    <input
                                      type="text"
                                      className="input_qty"
                                      value={cartProduct.quantity}
                                      onChange={(e) =>
                                        updateQty(id, cartProduct, e)
                                      }
                                      size="3"
                                    />
                                    <Button
                                      className="qty_btn"
                                      onClick={() => addQty(cartProduct)}
                                    >
                                      +
                                    </Button>
                                  </span>
                                  <ListItemText
                                    onClick={() =>
                                      navigate(`/products/${cartProduct.id}`)
                                    }
                                  >
                                    Số tiền:{" "}
                                    {cartProduct.total_price.toLocaleString(
                                      "vi",
                                      { style: "currency", currency: "VND" }
                                    )}
                                  </ListItemText>
                                </span>
                                <div
                                  style={{
                                    alignSelf: "start",
                                    right: 0,
                                    position: "absolute",
                                  }}
                                >
                                  <IconButton
                                    onClick={(e) =>
                                      removeItem(
                                        cartProduct.cart_id,
                                        cartProduct.user_id
                                      )
                                    }
                                  >
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

                  <div
                    className="drawer_footer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="estimated_total">
                      Tổng thanh toán:{" "}
                      {total.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                    <div className="minicart_action">
                      <Button
                        className="checkout checkout-btn"
                        href={"/checkout"}
                        disabled={cart.cartItems.length <= 0}
                      >
                        CHECKOUT
                      </Button>
                    </div>
                  </div>
                </Drawer>
              </Backdrop>
            </span>

            {/* ACCOUNT, ORDER, LOGOUT */}
            <div>
              {storage.getItem("token") ? (
                <>
                  <div
                    className="header-user-avatar"
                    onClick={handleOpenPopover}
                  >
                    <img
                      src={
                        account.urlAvatar
                          ? "http://localhost:8080/api/v1/fileUpload/files/" +
                            account.urlAvatar
                          : accountDefaultImg
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
                      <NavLink
                        className="popover-user"
                        href={`/accounts/${id}`}
                      >
                        <PersonIcon
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                        />
                        <span>Tài khoản</span>
                      </NavLink>
                      <NavLink className="popover-user" href={`/changePass`}>
                        <KeyIcon
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                        />
                        <span>Thay đổi mật khẩu</span>
                      </NavLink>
                      <NavLink className="user-popover-footer" href={`/orders`}>
                        <LocalMallIcon
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                        />
                        <span>Đơn hàng</span>
                      </NavLink>
                      <NavLink className="user-popover-footer" onClick={logout}>
                        <LogoutIcon
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                        />
                        <span>Đăng xuất</span>
                      </NavLink>
                    </div>
                  </Popover>
                </>
              ) : (
                <div className="header-login">
                  <NavLink
                    onClick={() => startTransition(() => navigate(`/login`))}
                    style={{ color: "#0a0f9e" }}
                  >
                    ĐĂNG NHẬP
                  </NavLink>

                  <NavLink
                    onClick={() => startTransition(() => navigate(`/register`))}
                    style={{ color: "#0a0f9e" }}
                  >
                    ĐĂNG KÝ
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
