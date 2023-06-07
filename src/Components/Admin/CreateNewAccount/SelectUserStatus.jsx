import React from "react";
import Select from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

function SelectUserStatus(props) {
  let {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...propsOther
  } = props;

  //   Lấy ra danh sách item từ tầng trên truyền xuống
  const listItem = propsOther.listItem;
  // console.log("listItem: ", listItem);
  // Hiển thị item
  let itemDropdown = listItem.map((item, index) => {
    return (
      <MenuItem  value={item} key={index}>
        {item === "ACTIVE" ? "Hoạt động" : item === "INACTIVE" ? "Không hoạt động" : null}
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

export default SelectUserStatus;