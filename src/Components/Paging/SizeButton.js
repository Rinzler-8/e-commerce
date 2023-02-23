import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

function SizeButton(props) {
  let { onHandleChangeSize } = props;
  let sizeOption = [5, 10, 15, 20];
  // State quản lý đóng mở Drowndown
  let [dropdownShow, setDropdownShow] = useState(false);
  // State quản lý giá trị của item
  let [value, setValue] = useState(5);

  //Hàm thực hiện toggle dropdown
  let handleToggle = () => {
    setDropdownShow(!dropdownShow);
  };
  //Xử lý khi lựa chọn item
  let handleSelectItemDropDown = (item) => {
    setValue(item);
    onHandleChangeSize(item);
  };
  //Hiển thị item
  let itemDropdown = sizeOption.map((item, index) => {
    return (
      <DropdownItem
        onClick={() => {
          handleSelectItemDropDown(item);
        }}
        key={index}
      >
        {item}
      </DropdownItem>
    );
  });

  return (
    <div>
      <Dropdown isOpen={dropdownShow} toggle={handleToggle}>
        <DropdownToggle caret style={{ backgroundColor: "blue" }}>
          {value}
        </DropdownToggle>
        <DropdownMenu>{itemDropdown}</DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default SizeButton;
