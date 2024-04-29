import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectOrderStatus(props) {
  let {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...propsOther
  } = props;

  //   Lấy ra danh sách item từ tầng trên truyền xuống
  const listStatus = propsOther.listItem;
  // console.log("listItem: ", listStatus);
  // Hiển thị item
  let itemDropdown = listStatus.map((item, index) => {
    return (
      <MenuItem value={item} key={index}>
        {item === "PENDING"
          ? "Đang chờ"
          : item === "CONFIRMED"
          ? "Đã xác nhận"
          : item === "SHIPPED"
          ? "Đã giao cho vận chuyển"
          : item === "DELIVERING"
          ? "Đang giao hàng"
          : item === "DELIVERED"
          ? "Đã giao cho khách"
          : item === "CANCELED"
          ? "Đã hủy"
          : null}
      </MenuItem>
    );
  });
  //
  return (
    <div>
      <br />
      <FormControl sx={{marginBottom: "25px"}} fullWidth>
        <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
        <Select
              fullWidth
              {...field} {...propsOther}
              variant="outlined"
              label="Trạng thái"
              // sx={{ marginTop: 16 }}
            >
              {itemDropdown}
            </Select>
      </FormControl>
      {touched[field.name] && errors[field.name] && <div style={{ color: "red" }}>{errors[field.name]}</div>}
    </div>
  );
}

export default SelectOrderStatus;
