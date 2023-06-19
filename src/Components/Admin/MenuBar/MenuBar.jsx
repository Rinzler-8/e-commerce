import React from "react";
import "./MenuBar.css";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Popover } from "@mui/material";
import storage from "../../../Storage/Storage";
import productPageBanner from "../../../Assets/img/logowithbackground.png";
const MenuBar = () => {
  const [anchorSettings, setAnchorSettings] = React.useState(null);
  const openSettings = Boolean(anchorSettings);
  let navigate = useNavigate();
  const handleOpenSettings = (event) => {
    setAnchorSettings(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorSettings(null);
  };

  const logout = () => {
    storage.removeUserInfo();
    storage.removeToken();
    window.location.reload();
  };

  return (
    <div className="menu-container">
      <div className="logo-area">
        <img src={productPageBanner} alt="logo" />
        <span>Genuine & Dignity</span>
      </div>
      <div className="menu-area">
        <div className="menu-item">
          <DashboardIcon />
          <span>Bảng điều khiển</span>
        </div>
        <div className="menu-item" onClick={() => navigate(`/admin`)}>
          <PersonIcon />
          <span>Quản lí tài khoản</span>
        </div>
        <div className="menu-item" onClick={() => navigate(`/product-admin`)}>
          <InventoryIcon />
          <span>Quản lí sản phẩm</span>
        </div>
        <div className="menu-item" onClick={() => navigate(`/order-admin`)}>
          <InventoryIcon />
          <span>Quản lí đơn hàng</span>
        </div>
        <div className="menu-item" onClick={handleOpenSettings}>
          <SettingsIcon />
          <span>Cài đặt</span>
        </div>
        <Popover
          id="CategoryPopover"
          open={openSettings}
          onClose={handleCloseSettings}
          anchorEl={anchorSettings}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          style={{ zIndex: 9999 }}
        >
          <div className="user-popover-footer-admin" onClick={logout}>
            <LogoutIcon style={{ marginRight: "5px", marginBottom: "5px" }} />
            <span>Đăng xuất</span>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default MenuBar;
