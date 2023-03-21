import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";

function DirectionSortButton(props) {
  let { onHandleChangeDirectionSort } = props;

  let directionOption = ["ASC", "DESC"];

  let [dropDown, setDropdown] = useState(false);

  let [value, setValue] = useState("ASC");

  let handleToggle = () => {
    setDropdown(!dropDown);
  };
  let handleSelectOption = (item) => {
    setValue(item);
    onHandleChangeDirectionSort(item);
  };
  let itemDropdown = directionOption.map((item, index) => {
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
      <Dropdown isOpen={dropDown} toggle={handleToggle}>
        <DropdownToggle caret style={{ backgroundColor: "blue" }}>
          {value}
        </DropdownToggle>
        <DropdownMenu>{itemDropdown}</DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default DirectionSortButton;
