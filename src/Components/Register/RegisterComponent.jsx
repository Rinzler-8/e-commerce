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
      <Formik
        initialValues={{
          username: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(6, "Phải từ 6 đến 50 ký tự.")
            .max(50, "Phải từ 6 đến 50 ký tự.")
            .required("Trường này là bắt buộc.")
            .test("checkUniqueUsername", "Tên người dùng đã được đăng ký.", async (username) => {
              // call api
              const isExists = await getUsernameExists(username);
              return !isExists;
            }),

          email: Yup.string()
            .min(6, "Phải từ 6 đến 50 ký tự.")
            .max(50, "Phải từ 6 đến 50 ký tự.")
            .required("Trường này là bắt buộc.")
            .test("checkUniqueEmail", "Email đã được đăng ký.", async (email) => {
              // call api
              const isExists = await getEmailExists(email);
              return !isExists;
            }),

          password: Yup.string().min(6, "Phải từ 6 đến 50 ký tự.").max(50, "Phải từ 6 đến 50 ký tự.").required("Trường này là bắt buộc."),
          confirmPassword: Yup.string()
            .required("Trường này là bắt buộc.")
            .when("password", {
              is: (val) => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf([Yup.ref("password")], "Mật khẩu không khớp."),
            }),
          mobile: Yup.string().min(10, "Must be 10 numbers").max(10, "Must be 10 numbers").required("Trường này là bắt buộc."),
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
            toast.info("Hãy kiểm tra email để kích hoạt tài khoản.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => navigate("/login"), 3000);
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
                sm={{
                  offset: 1,
                  size: 7,
                }}
                style={{ marginTop: 60 }}
              >
                <Form>
                  <div className="title-header">
                    <h5>CREATE AN ACCOUNT</h5>
                    <hr></hr>
                  </div>
                  {/* username */}
                  <Field fullWidth className="input" name="username" type="text" placeholder="Nhập Tên Đăng Ký" label="Tên đăng ký:" component={CustomInput} />
                  {/* email */}
                  <Field fullWidth className="input" name="email" type="email" placeholder="Nhập email" label="Email:" component={CustomInput} />
                  {/* mobile */}
                  <Field
                    fullWidth
                    className="input"
                    name="mobile"
                    type="number"
                    placeholder="Nhập số điện thoại"
                    label="Số điện thoại:"
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
                  <Field
                    fullWidth
                    className="input"
                    name="confirmPassword"
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
                    <Button type="submit" className="register">
                      Đăng ký
                    </Button>
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
  );
}

export default RegisterComponent;
