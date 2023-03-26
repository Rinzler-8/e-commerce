import React from "react";
import { Navbar, NavItem, NavLink, Nav, NavbarBrand, Button } from "reactstrap";
import { MenuList, ListItemIcon, Popover, Badge, Drawer, Typography, Menu, MenuItem, ListItemText, Divider } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { styled, useTheme } from "@mui/material/styles";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetCartByUserIdAPI, actionAddItemQty, actionDecItemQty, actionUpdateCartAPI, actionDeleteCartItemAPI } from "../../Redux/Action/CartAction";
import { actionFetchSingleAccountAPI } from "../../Redux/Action/AccountAction";
import { actionFetchCategoryAPI } from "../../Redux/Action/CategoryAction";
import { useNavigate } from "react-router-dom";
import { updateCartAPI } from "../../API/CartAPI";
import "../../css/Header.css";
import { StyledBadge } from "../StyledMUI";

function Header() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [header, setHeader] = React.useState(false);
  const stateRedux = useSelector((cartItems) => cartItems);
  const dispatchRedux = useDispatch();
  const cart = stateRedux.cartReducer;
  const account = stateRedux.singleAccountReducer;
  const listCategories = stateRedux.listCategoryReducer;
  console.log("cat", listCategories);
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorCat, setAnchorCat] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const openCategories = Boolean(anchorCat);
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
  useEffect(() => {
    if (id && id !== "") dispatchRedux(actionGetCartByUserIdAPI(id));
    dispatchRedux(actionFetchSingleAccountAPI(id));
    dispatchRedux(actionFetchCategoryAPI(id));
  }, [id]);

  const changeNavBack = () => {
    if (window.scrollY >= 90) {
      setHeader(true);
    } else {
      setHeader(false);
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

  const logout = () => {
    localStorage.removeItem("token");
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
    <div className={header ? "header active" : "header"}>
      <div className="header-left">
        <img src={require("../../Assets/img/logowithbackground.png")} alt="logo" />
        <NavLink href="/" className="header-logo-name">
          GENUINE & DIGNITY
        </NavLink>
      </div>
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
          <div className="user-popover-wrapper">
            {listCategories.map((cat, index) => (
              <>
                <NavLink className="popover-item">
                  <span>{cat.name}</span>
                </NavLink>
                <Divider />
              </>
            ))}
          </div>
          <NavLink href="/products">Xem tất cả</NavLink>
        </Popover>
        <NavLink className="header-center-content">GIỚI THIỆU</NavLink>
        <NavLink className="header-center-content">LIÊN HỆ</NavLink>
      </div>
      <div className="header-right">
        <div className="header-icon-area">
          <button className="style-btn-icon">{/* <SearchIcon/>/ */}</button>
          <span style={{ marginRight: "30px" }}>
            <StyledBadge badgeContent={0} max={99} showZero>
              <ShoppingBagIcon color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" />
            </StyledBadge>
          </span>
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
                    <NavLink className="popover-item" href={`/accounts/${id}`}>
                      <PersonIcon />
                      <span>Tài khoản</span>
                    </NavLink>
                    <NavLink className="user-popover-footer" onClick={logout}>
                      <LogoutIcon />
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
                <NavLink href="/login" style={{ color: "#0a0f9e" }}>
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
