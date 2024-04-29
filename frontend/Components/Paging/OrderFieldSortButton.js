import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";

function FieldSortButton(props) {
  //Gọi lại các props từ trên truyền xuống
  let { onHandleChangeFieldSort } = props;
  //
  let fieldOption = ["id", "price", "name", "ratingStar", "manufacturer", "category", "createDate"];
  // State quản lý đóng mở dropdown
  let [dropdown, setDropdown] = useState(false);
  // State quản lý giá trị của item
  let [value, setValue] = useState("id");

  //Hàm thực hiện toggle trạng thái dropdown
  let handleToggle = () => {
    setDropdown(!dropdown);
  };

  //Xử lý khi lựa chọn từng item
  let handleSelectOption = (item) => {
    setValue(item);
    onHandleChangeFieldSort(item);
  };
  // Hiển thị item
  let itemDropdown = fieldOption.map((item, index) => {
    return (
      <DropdownItem
        onClick={() => {
          handleSelectOption(item);
        }}
        key={index}
      >
        {item}
      </DropdownItem>
    );
  });
  return (
    <div>
      <Dropdown isOpen={dropdown} toggle={handleToggle}>
        <DropdownToggle caret style={{ backgroundColor: "blue" }}>
          {value}
        </DropdownToggle>
        <DropdownMenu>{itemDropdown}</DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default FieldSortButton;
