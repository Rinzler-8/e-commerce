import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import "../../src/css/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassAPI } from "../API/ResetPassAPI";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actionFetchSingleAccountAPI } from "../Redux/Action/AccountAction";
import storage from "../Storage/Storage";
// import bcrypt from "bcryptjs";

const ChangePassPage = () => {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  // const singleAccount = useSelector((state) => state.singleAccountReducer);
  const id = storage.getItem("id");
  const token = useParams();
  // const passRegExp = new RegExp(
  //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  // );

  // const checkPassword = (password, hash) => {
  //   const isMatch = bcrypt.compareSync(String(password), hash);
  //   return isMatch;
  // };

  const togglePassword = () => {
    // console.log("password: ", storage.getItem(""))
    setIsShown((isShown) => !isShown);
  };

  useEffect(() => {
    dispatchRedux(actionFetchSingleAccountAPI(id));
    // Gọi useEffect để load dữ liệu list Department và Positon
  });

  // console.log("single pass", singleAccount.password);

  function CustomInput(props) {
    let {
      field,
      form: { touched, errors },
      ...propsOther
    } = props;
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
        oldPass: "",
        newPass: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        // password: Yup.string().matches(passRegExp, "Mật khẩu yếu, vui lòng thử lại!").required("Trường này là bắt buộc!"),
        oldPass: Yup.string()
          .required("Trường này là bắt buộc!")
          .test(
            "checkUniquePassword",
            "Mật khẩu không đúng!",
            // async (oldPass) => {
            //   const isExists = await checkPassword(
            //     oldPass,
            //     singleAccount.password
            //   );
            //   return isExists;
            // }
          ),
        newPass: Yup.string()
          .required("Trường này là bắt buộc!")
          .test(
            "checkUniquePassword",
            "Mật khẩu đã tồn tại!",
            // async (oldPass) => {
            //   const isExists = await checkPassword(
            //     oldPass,
            //     singleAccount.password
            //   );
            //   return !isExists;
            // }
          ),
        confirmPassword: Yup.string()
          .required("Trường này là bắt buộc!")
          .when("newPass", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("newPass")],
              "Mật khẩu không khớp!"
            ),
          }),
      })}
      onSubmit={async (values) => {
        try {
          let pass = {
            newPass: values.newPass,
          };
          await resetPassAPI(token, pass).then(((response) => {
            if (response !== null && response !== undefined) {
              toast.success("Thành công.", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => navigate("/"), 3000);
            }
          }));

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
      {() => (
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
                  name="oldPass"
                  type={isShown ? "text" : "password"}
                  placeholder="Nhập Mật khẩu cũ"
                  label="Mật khẩu cũ:"
                  component={CustomInput}
                />
                <Field
                  fullWidth
                  className="input"
                  name="newPass"
                  type={isShown ? "text" : "password"}
                  placeholder="Nhập Mật khẩu"
                  label="Mật khẩu mới:"
                  component={CustomInput}
                />
                <Field
                  fullWidth
                  className="input"
                  name="confirmPassword"
                  type={isShown ? "text" : "password"}
                  placeholder="Nhập lại Mật Khẩu"
                  label="Nhập lại Mật Khẩu mới:"
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

export default ChangePassPage;
