import React from "react";
import { Field } from "formik";

function SelectComponent(props) {
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
      <option value={item} key={index}>
        {item == "ACTIVE"
          ? "Hoạt động"
          : item == "INACTIVE"
          ? "Không hoạt động"
          : null}
      </option>
    );
  });
  //
  return (
    <div>
      <br />
      <h5 htmlFor={field.name}>{propsOther.label}</h5>
      <Field as="select" name={field.name}>
        {itemDropdown}
      </Field>
      {touched[field.name] && errors[field.name] && <div style={{ color: "red" }}>{errors[field.name]}</div>}
    </div>
  );
}

export default SelectComponent;
