import React from "react";
import { useSelector } from "react-redux";

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
