import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

function LoadMoreButton(props) {
  let { onHandleChangeSize } = props;
  let stateRedux = useSelector((state) => state);
  let size = stateRedux.pageFilterReducer.size;
  // State quản lý giá trị của item
  //Xử lý khi lựa chọn item
  let handleSelectItemDropDown = () => {
    let s = size + 6;
    onHandleChangeSize(s);
  };
  return (
    <div>
      <button className="btn-show-more" onClick={handleSelectItemDropDown}>Tải thêm</button>
    </div>
  );
}

export default LoadMoreButton;
