import React, { useEffect, useRef, useContext } from "react";
import { NavLink, Button } from "reactstrap";
import { Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchCategoryAPI } from "../../Redux/Action/CategoryAction";
import "./Header.scss";
import AppContext from "../../AppContext";

function Menu() {
  const stateRedux = useSelector((cartItems) => cartItems);
  const dispatchRedux = useDispatch();
  const listCategories = stateRedux.listCategoryReducer;
  let [anchorCat, setAnchorCat] = React.useState(null);
  const openCategories = Boolean(anchorCat);
  const { scrollToComponent, drawerIsOpen } = useContext(AppContext);

  const handleOpenCategories = (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleCloseCategories = () => {
    setAnchorCat(null);
  };

  useEffect(() => {
    dispatchRedux(actionFetchCategoryAPI());
  }, [drawerIsOpen]);

  return (
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
              <NavLink
                href={`/categories/${cat.name}`}
                className="popover-item"
              >
                <span>{cat.name}</span>
              </NavLink>
            </div>
          ))}
          <NavLink href="/products" className="popover-viewAll">
            Xem tất cả
          </NavLink>
        </div>
      </Popover>
      <NavLink onClick={scrollToComponent} className="header-center-content">
        GIỚI THIỆU
      </NavLink>
      <NavLink className="header-center-content">LIÊN HỆ</NavLink>
    </div>
  );
}

export default Menu;
