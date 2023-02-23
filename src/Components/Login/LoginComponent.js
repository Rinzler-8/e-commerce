import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import CustomInput from "./CustomInput";
import * as Yup from "yup";
import "./../../css/AccountForm.css";
import { Link } from "react-router-dom";
import storage from "./../../Storage/Storage";

function LoginComponent(props) {
  const [isShown, setIsShown] = useState(false);

  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  let { handleLogin } = props;
  return (
    <div className="row ">
      <div className="col" id="col1">
        <div className="left">
          <img alt="Sample" src={require("../../Assets/Banner/background.jpg")} />
        </div>
      </div>
      <div className="col" id="col2">
        <div className="right">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Không được để trống username"),
              password: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Không được để trống password"),
            })}
            onSubmit={(values) => {
              let accountLogin = {
                username: values.username,
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
                      offset: 1,
                      size: 7,
                    }}
                  >
                    <Form>
                      {/* Login */}
                      <div className="title">
                        <h3>THAM GIA CHÊ PHIM NGAY</h3>
                        <hr></hr>
                      </div>
                      <div className="title-header">
                        <h3>ĐĂNG NHẬP</h3>
                        <hr></hr>
                      </div>

                      {/* username */}
                      <Field className="input" name="username" type="text" placeholder="Nhập Tên Đăng Nhập" label="Tên đăng nhập:" component={CustomInput} />
                      {/* password */}

                      <Field
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
                        <Button type="submit">Đăng nhập</Button>

                        <Row className="loginThirdParties">
                          <Col className="">Đăng nhập bằng:</Col>
                          <Col className="socialIcons"></Col>
                        </Row>

                        <Button type="button" href={"/register"}>
                          Đăng ký
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
      </div>
    </div>
  );
}

export default LoginComponent;
