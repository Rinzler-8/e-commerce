import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import CustomInput from "./CustomInput";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./../../../src/css/LoginForm.css";
import storage from "../../Storage/Storage";

function LoginComponent(props) {
  const [isShown, setIsShown] = useState(false);
  const emailRegExp = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  let { handleLogin } = props;
  return (
    <div className="row">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().matches(emailRegExp, "Email không hợp lệ!").required("Trường này là bắt buộc!"),
          password: Yup.string().required("Trường này là bắt buộc!"),
        })}
        onSubmit={(values) => {
          let accountLogin = {
            email: values.email,
            password: values.password,
          };
          handleLogin(accountLogin);
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ validateField, validateForm }) => (
          <Container>
            <Row>
              <Col className="loginForm" style={{ width: "400px", marginBottom: 100, padding: 50, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <Form>
                  {/* Login */}
                  <div className="title-header">
                    <h4>ĐĂNG NHẬP</h4>
                    <hr></hr>
                  </div>

                  {/* email */}
                  <Field fullWidth className="input" name="email" type="text" placeholder="Nhập Email" label="Email:" component={CustomInput} />
                  {/* password */}
                  <Field
                    fullWidth
                    className="input"
                    name="password"
                    type={isShown ? "text" : "password"}
                    placeholder="Nhập Mật khẩu"
                    label="Mật khẩu:"
                    component={CustomInput}
                  />
                  <label className="checkbox">
                    <Field type="checkbox" name="toggle" checked={isShown} onChange={togglePassword} />
                    {`Hiện Mật Khẩu`}
                  </label>

                  {/* Submit */}
                  <Row className="logButton">
                    <Button type="submit" className="login">
                      Đăng nhập
                    </Button>
                    <Link to={"/forgotPass"} className="link" style={{ textAlign: "center" }}>
                      Quên mật khẩu
                    </Link>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    </div>
  );
}

export default LoginComponent;
