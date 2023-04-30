import React from "react";
import { Field } from "formik";

function SelectComponent(props) {
  let {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...propsOther
  } = props;
  //   console.log("props: ", props);

  //   Lấy ra danh sách item từ tầng trên truyền xuống
  let listItem = propsOther.listItem;

  // Hiển thị item
  let itemDropdown = listItem.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });
  //
  return (
    <div>
      <br />
      <h5 htmlFor={field.name}>{propsOther.label}</h5>
      <Field as="select" name={field.name}>
        <option value="">Chuyển trạng thái</option>
        {itemDropdown}
      </Field>
      {touched[field.name] && errors[field.name] && <div style={{ color: "red" }}>{errors[field.name]}</div>}
    </div>
  );
}

export default SelectComponent;
