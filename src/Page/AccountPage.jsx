import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, Grid, Box, Typography, Rating, Item, Paper, TextField, Avatar, ListItemText, ListItem, List } from "@mui/material";
import { actionFetchSingleAccountAPI, actionFetchSingleAccountRedux } from "../Redux/Action/AccountAction";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { updateAccountAPI, getUsernameExists, getEmailExists } from "../API/AccountAPI";
import "../../src/css/Profile.css";

const AccountPage = () => {
  let stateRedux = useSelector((state) => state);
  let navigate = useNavigate();
  let dispatchRedux = useDispatch();
  let account = stateRedux.singleAccountReducer;
  console.log("account: ", account.firstName);
  let id = localStorage.getItem("id");
  useState(() => {
    if (id && id !== "") {
      dispatchRedux(actionFetchSingleAccountAPI(id));
    }
  }, []);

  function CustomInput(props) {
    let {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...propsOther
    } = props;
    // InputProps= {{className: "input"}}
    return (
      <div>
        <TextField {...field} {...propsOther} variant="standard" style={{ marginBottom: "20px" }} />
        {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </div>
    );
  }
  return (
    <Row className="container">
      {/* SHIPPING INFORMATION */}
      <Col xs={12} xl={8}>
        <Paper style={{ marginTop: "0px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
          <Formik
            initialValues={{
              first_name: account.firstName,
              last_name: account.lastName,
              mobile: account.mobile,
              email: account.email,
              address: account.address,
            }}
            validationSchema={Yup.object({
              first_name: Yup.string().required("Trường này là bắt buộc."),
              last_name: Yup.string().required("Trường này là bắt buộc."),
              email: Yup.string(),
              address: Yup.string().required("Trường này là bắt buộc."),

              mobile: Yup.string().min(6, "Phải đủ 10 ký tự.").max(10, "Phải đủ 10 ký tự.").required("Trường này là bắt buộc."),
            })}
            onSubmit={(values) => {
              try {
                const update = {
                  firstName: values.first_name,
                  lastName: values.last_name,
                  email: values.email,
                  mobile: values.mobile,
                  address: values.address,
                };
                updateAccountAPI(id, update).then((response) => {
                  if (response !== null && response !== undefined) {
                    console.log("response: ", response);
                    toast.success("Thành công.", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    toast.error("Đã có lỗi xảy ra! Vui lòng thử lại.", {
                      position: "top-right",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                });
              } catch (error) {
                toast.error(error, {
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
                  <Col style={{ marginTop: 50 }}>
                    <Form>
                      <span>
                        <Avatar style={{ backgroundColor: "blue" }}>1</Avatar>
                        <h3 className="shipping">Thông tin</h3>
                      </span>
                      <Row>
                        <Col md={6} className="mb-3">
                          <Field
                            fullWidth
                            name="first_name"
                            type="text"
                            defaultValue={account.firstName}
                            placeholder="Nhập tên"
                            label="Tên: "
                            component={CustomInput}
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <Field
                            fullWidth
                            name="last_name"
                            type="text"
                            defaultValue={account.lastName}
                            placeholder="Nhập họ"
                            label="Họ:"
                            component={CustomInput}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mb-3">
                          <Field
                            className="input"
                            fullWidth
                            name="mobile"
                            type="text"
                            defaultValue={account.mobile}
                            label="Số điện thoại:"
                            component={CustomInput}
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <Field fullWidth className="input" name="email" type="email" defaultValue={account.email} label="Email:" component={CustomInput} />
                        </Col>
                      </Row>
                      <Field className="input" fullWidth name="address" type="text" defaultValue={account.address} label="Địa chỉ:" component={CustomInput} />

                      {/* Submit */}
                      <Row className="button">
                        <Button type="submit">Thay đổi</Button>
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
          <ToastContainer />
        </Paper>
      </Col>

      {/* ORDER SUMMARY */}
      <Col xs={12} xl={4}>
        <Paper style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", backgroundColor: "lightgray" }}>
          <Container>
            <Avatar alt="Remy Sharp" src={"http://localhost:8080/api/v1/fileUpload/files/" + account.urlAvatar} sx={{ width: 200, height: 200 }} />
          </Container>
        </Paper>
      </Col>
    </Row>
  );
  // }
};

export default AccountPage;
