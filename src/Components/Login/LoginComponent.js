import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import CustomInput from "./CustomInput";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./../../../src/css/LoginForm.css";
import storage from "./../../Storage/Storage";

function LoginComponent(props) {
  const [isShown, setIsShown] = useState(false);

  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  let { handleLogin } = props;
  return (
    <div className="row ">
      {/* <div className="left">
          <img alt="Sample" src={require("../../Assets/Banner/background.jpg")} />
        </div> */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("Trường này là bắt buộc."),
          password: Yup.string().required("Trường này là bắt buộc."),
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
              <Col
                sm={{
                  offset: 4,
                  size: 7,
                }}
                style={{ marginTop: 60 }}
              >
                <Form>
                  {/* Login */}
                  <div className="title-header">
                    <h5>SIGN IN</h5>
                    <hr></hr>
                  </div>

                  {/* email */}
                  <Field
                    fullWidth
                    className="input"
                    name="email"
                    type="text"
                    placeholder="Nhập Email"
                    label="Email:"
                    component={CustomInput}
                  />
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
                  <Row className="button">
                    <Button type="submit" className="login">
                      Đăng nhập
                    </Button>
                    <Link to={"/forgot"} className="link">
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
