import React from "react";
import { TextField } from '@mui/material';

function CustomInput(props) {
  let {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...propsOther
  } = props;
  // InputProps= {{className: "input"}}
  return (
    <div>
      <TextField {...field} {...propsOther} variant="standard" style={{ marginBottom: "20px"}} />
      {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  );
}

export default CustomInput;
