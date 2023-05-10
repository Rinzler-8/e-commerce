import React from "react";
import { Field } from "formik";
import Select from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

function SelectUpdateRole(props) {
  let {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...propsOther
  } = props;

  //   Lấy ra danh sách item từ tầng trên truyền xuống
  const listUpdateRole = propsOther.listItem;
  // Hiển thị item
  let itemDropdown = listUpdateRole.map((item, index) => {
    return (
      <MenuItem  value={item} key={index}>
        {item}
      </MenuItem>
    );
  });
  //
  return (
    <div>
      <br />
      <FormControl sx={{marginBottom: "25px"}} fullWidth>
        <InputLabel id="demo-simple-select-label">Phân quyền</InputLabel>
        <Select
              fullWidth
              {...field} {...propsOther}
              variant="outlined"
              label="Phân quyền"
              multiple
              // sx={{ marginTop: 16 }}
            >
              {itemDropdown}
            </Select>
      </FormControl>
      {touched[field.name] && errors[field.name] && <div style={{ color: "red" }}>{errors[field.name]}</div>}
    </div>
  );
}

export default SelectUpdateRole;