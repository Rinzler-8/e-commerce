import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import CustomInput from "./CustomInput";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { getUsernameExists, getEmailExists } from "../../API/AccountAPI";
import { addAccountNewAPI } from "../../API/RegisterAPI";
import "./../../../src/css/Register.css";
import "./../../../src/css/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterComponent(props) {
  const [isShown, setIsShown] = useState(false);
  // Quản lý trạng thái ẩn hiện Password

  let navigate = useNavigate();

  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };

  return (
    <div className="row">
      <div className="col " id="col1">
        <div className="left">
          <img alt="Sample" src={require("../../Assets/Banner/background.jpg")} />
        </div>
      </div>
      <div className="col " id="col2">
        <div className="right">
          <Formik
            initialValues={{
              username: "",
              email: "",
              mobile: "",
              password: "",
              ConfirmPassword: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Không được để trống username")
                .test("checkUniqueUsername", "Tên người dùng đã được đăng ký.", async (username) => {
                  // call api
                  const isExists = await getUsernameExists(username);
                  return !isExists;
                }),

              email: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Không được để trống email")
                .test("checkUniqueEmail", "Email đã được đăng ký.", async (email) => {
                  // call api
                  const isExists = await getEmailExists(email);
                  return !isExists;
                }),

              password: Yup.string()
                .min(6, "Must be between 6 and 50 characters")
                .max(50, "Must be between 6 and 50 characters")
                .required("Không được để trống password"),
              ConfirmPassword: Yup.string()
                .required("Không được để trống password")
                .when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf([Yup.ref("password")], "Mật khẩu không khớp."),
                }),
              mobile: Yup.string()
                .min(6, "Must be between 6 and 10 characters")
                .max(10, "Must be between 6 and 10 characters")
                .required("Không được để trống số điện thoại"),
            })}
            onSubmit={(values) => {
              try {
                const accountRegister = {
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  mobile: values.mobile,
                  role: values.role,
                };
                addAccountNewAPI(accountRegister);
                toast.success("Hãy kiểm tra email.", {
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                setTimeout(() => navigate("/login"), 3000);
              } catch (error) {
                // alert("Hãy kiểm tra lại thông tin!");
                // navigate("/login");
              }
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
                    style={{ marginTop: 60 }}
                  >
                    <Form>
                      {/* Register */}
                      <div className="title">
                        <h3>THAM GIA CHÊ PHIM NGAY</h3>
                        <hr></hr>
                      </div>
                      <div className="title-header">
                        <h3>ĐĂNG KÝ</h3>
                        <hr></hr>
                      </div>
                      {/* username */}
                      <Field className="input" name="username" type="text" placeholder="Nhập Tên Đăng Ký" label="Tên đăng ký:" component={CustomInput} />
                      {/* email */}
                      <Field className="input" name="email" type="email" placeholder="Nhập email" label="Email:" component={CustomInput} />
                      {/* mobile */}
                      <Field className="input" name="mobile" type="text" placeholder="Nhập số điện thoại" label="Số điện thoại:" component={CustomInput} />
                      {/* password */}
                      <Field
                        className="input"
                        name="password"
                        type={isShown ? "text" : "password"}
                        placeholder="Nhập Mật khẩu"
                        label="Mật khẩu:"
                        component={CustomInput}
                      />
                      <Field
                        className="input"
                        name="ConfirmPassword"
                        type={isShown ? "text" : "password"}
                        placeholder="Nhập lại Mật Khẩu"
                        label="Nhập lại Mật Khẩu:"
                        component={CustomInput}
                      />

                      {/* Checkbox */}

                      <label className="checkbox">
                        <Field type="checkbox" name="toggle" checked={isShown} onChange={togglePassword} />
                        {`Hiện Mật Khẩu`}
                      </label>

                      {/* Submit */}
                      <Row className="button">
                        <Button type="submit">Đăng ký</Button>
                        <Link to={"/login"} className="link">
                          Quay lại
                        </Link>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Container>
            )}
          </Formik>
          <ToastContainer />;
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
