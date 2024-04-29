import React from "react";
import { Input } from "reactstrap";

function InputComponent(props) {
  let {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...propsOther
  } = props;
  // console.log("props: ", props);
  return (
    <div>
      <br />
      <h5 htmlFor={field.name}>{propsOther.label}</h5>
      <Input {...field} {...propsOther} />
      {/* Error Message */}
      {touched[field.name] && errors[field.name] && <div style={{ color: "red" }}>{errors[field.name]}</div>}
    </div>
  );
}

export default InputComponent;
