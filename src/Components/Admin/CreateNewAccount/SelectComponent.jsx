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
  const listStatus = ["Đang chờ", "Đã xác nhận", "Đã giao cho vận chuyển", "Đang giao hàng", "Đã giao cho khách", "Hủy"];
  // console.log("listItem: ", listItem);
  // Hiển thị item
  let itemDropdown = listItem.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item == "PENDING"
          ? "Đang chờ"
          : item == "CONFIRMED"
          ? "Đã xác nhận"
          : item == "SHIPPED"
          ? "Đã giao cho vận chuyển"
          : item == "DELIVERING"
          ? "Đang giao hàng"
          : item == "DELIVERED"
          ? "Đã giao cho khách"
          : item == "CANCELED"
          ? "Đã hủy"
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
