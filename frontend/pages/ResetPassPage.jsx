import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import "../../src/css/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassAPI } from "../api/ResetPassAPI";

const ResetPassPage = () => {
  const [isShown, setIsShown] = useState(false);
  const passRegExp = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,50})"
  );
  let navigate = useNavigate();
  let token = useParams();
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  function CustomInput(props) {
    let {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...propsOther
    } = props;
    // InputProps= {{className: "input"}}
    return (
      <div>
        <TextField
          {...field}
          {...propsOther}
          variant="standard"
          style={{ marginBottom: "20px" }}
        />
        {touched[field.name] && errors[field.name] && (
          <div className="error">{errors[field.name]}</div>
        )}
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string()
          .matches(passRegExp, "Mật khẩu yếu, vui lòng thử lại!")
          .required("Trường này là bắt buộc!"),
        confirmPassword: Yup.string()
          .required("Trường này là bắt buộc!")
          .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Mật khẩu không khớp!"
            ),
          }),
      })}
      onSubmit={async (values) => {
        try {
          let pass = {
            password: values.password,
          };
          await resetPassAPI(token, pass);
          toast.success("Thành công.", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => navigate("/"), 3000);
        } catch (error) {
          toast.error("Đã có lỗi! Vui lòng thử lại.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ validateField, validateForm }) => (
        <Container>
          <Row>
            <Col
              style={{
                maxWidth: "400px",
                marginBottom: 100,
                padding: 50,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Form>
                {/* Login */}
                <div className="title-header">
                  <h5>THAY ĐỔI MẬT KHẨU</h5>
                  <hr></hr>
                </div>

                <Field
                  fullWidth
                  className="input"
                  name="password"
                  type={isShown ? "text" : "password"}
                  placeholder="Nhập Mật khẩu"
                  label="Mật khẩu:"
                  component={CustomInput}
                />
                <Field
                  fullWidth
                  className="input"
                  name="confirmPassword"
                  type={isShown ? "text" : "password"}
                  placeholder="Nhập lại Mật Khẩu"
                  label="Nhập lại Mật Khẩu:"
                  component={CustomInput}
                />
                <label className="checkbox">
                  <Field
                    type="checkbox"
                    name="toggle"
                    checked={isShown}
                    onChange={togglePassword}
                  />
                  {`Hiện Mật Khẩu`}
                </label>

                {/* Submit */}
                <Row className="button">
                  <Button type="submit" className="login">
                    Thay đổi
                  </Button>
                </Row>
              </Form>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      )}
    </Formik>
  );
};

export default ResetPassPage;
