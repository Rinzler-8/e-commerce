import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  NavLink,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Rating,
  Item,
  Paper,
  TextField,
  Avatar,
  TextareaAutosize,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { checkoutAPI } from "../API/CheckoutAPI";
import "../../src/css/CheckoutPage.css";
import { actionCheckoutAPI } from "../Redux/Action/CheckoutAction";
import {
  actionDeleteAllCartItemsAPI,
  actionCloseCart,
} from "../Redux/Action/CartAction";

const CheckOutList = () => {
  const [isShown, setIsShown] = useState(false);
  const phoneRegExp = /((84|0)[3|5|7|8|9])+([0-9]{8})\b/;
  let navigate = useNavigate();
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let cart = stateRedux.cartReducer;
  let id = localStorage.getItem("id");
  let total = 0;
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  useEffect(() => {
    dispatchRedux(actionCloseCart());
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
  function CustomTextArea(props) {
    let {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...propsOther
    } = props;
    // InputProps= {{className: "input"}}
    return (
      <div>
        <TextareaAutosize
          {...field}
          {...propsOther}
          minRows={4} // Set the desired number of rows
          placeholder="Ghi chú"
          variant="standard"
          style={{ width: "100%" }}
        />
        {touched[field.name] && errors[field.name] && (
          <div className="error">{errors[field.name]}</div>
        )}
      </div>
    );
  }
  if (cart) {
    return (
      <Grid container style={{ marginTop: "90px" }}>
        {/* SHIPPING INFORMATION */}
        <Grid item md={7}>
          <Paper
            style={{
              marginRight: "80px",
              marginLeft: "300px",
              marginTop: "80px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                mobile: "",
                delivery_address: "",
                note: "",
                paymentType: "COD",
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("Trường này là bắt buộc!"),
                lastName: Yup.string().required("Trường này là bắt buộc!"),

                delivery_address: Yup.string().required(
                  "Trường này là bắt buộc!"
                ),

                mobile: Yup.string()
                  .matches(phoneRegExp, "Số điện thoại không hợp lệ")
                  .required("Trường này là bắt buộc!"),
              })}
              onSubmit={(values) => {
                try {
                  const checkout = {
                    user_id: id,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    mobile: values.mobile,
                    delivery_address: values.delivery_address,
                    note: values.note,
                    paymentType: values.paymentType,
                  };
                  dispatchRedux(actionCheckoutAPI(checkout));
                  dispatchRedux(actionDeleteAllCartItemsAPI(id));
                  toast.success("Tạo đơn thành công.", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setTimeout(() => navigate("/checkoutSuccess"), 1000);
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
              {({ validateField, validateForm, isValid, dirty }) => (
                <Container>
                  <Row>
                    <Col style={{ marginTop: 20 }}>
                      <Form>
                        <span>
                          <h2 className="shipping">THÔNG TIN GIAO HÀNG</h2>
                        </span>

                        <Field
                          fullWidth
                          name="firstName"
                          type="text"
                          label="Tên"
                          component={CustomInput}
                        />
                        <Field
                          fullWidth
                          name="lastName"
                          type="text"
                          placeholder="Nhập Họ"
                          label="Họ:"
                          component={CustomInput}
                        />
                        <Field
                          className="input"
                          fullWidth
                          name="mobile"
                          type="text"
                          placeholder="Nhập số điện thoại"
                          label="Số điện thoại:"
                          component={CustomInput}
                        />
                        <Field
                          className="input"
                          fullWidth
                          name="delivery_address"
                          type="text"
                          placeholder="Nhập địa chỉ"
                          label="Địa chỉ:"
                          component={CustomInput}
                        />
                        <Field
                          className="input"
                          fullWidth
                          name="note"
                          type="text"
                          label="Ghi chú:"
                          component={CustomTextArea}
                        />
                        <div>Phương thức thanh toán</div>

                        <label className="payment">
                          COD
                          <Field
                            type="radio"
                            name="paymentType"
                            value="COD"
                            className="payment_radio"
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label className="payment">
                          BANKING
                          <Field
                            type="radio"
                            name="paymentType"
                            value="BANKING"
                            className="payment_radio"
                          />
                          <span className="checkmark"></span>
                        </label>
                        {/* Submit */}
                        <Row className="r">
                          <Button
                            type="submit"
                            className="submit-btn-profile"
                            disabled={!isValid || !dirty}
                          >
                            Mua hàng
                          </Button>
                          <Link
                            to={"/login"}
                            className="link"
                            style={{
                              textAlign: "center",
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          >
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
        </Grid>

        {/* ORDER SUMMARY */}
        <Grid item md={5}>
          <Paper
            style={{
              marginRight: "200px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Container className="summary_container">
              <div className="order_summary">thông tin đơn hàng</div>
              {cart.cartItems.map(
                (product, index) => (
                  (total += product.total_price),
                  (
                    <List key={index}>
                      <ListItem>
                        <div>
                          <NavLink href={`/products/${product.productId}`}>
                            <img
                              alt="Sample"
                              src={
                                "http://localhost:8080/api/v1/fileUpload/files/" +
                                product.imageName
                              }
                              style={{ width: 100, height: 100 }}
                            />
                          </NavLink>
                        </div>
                        <span>
                          <ListItemText>
                            <NavLink
                              href={`/products/${product.productId}`}
                              style={{ padding: 0 }}
                            >
                              <Typography style={{ fontSize: 20 }}>
                                {product.productName}
                              </Typography>
                            </NavLink>
                            <Typography>
                              {product.price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </Typography>
                            <Typography>
                              Số lượng: {product.quantity}
                            </Typography>
                          </ListItemText>
                          <ListItemText>
                            Số tiền:{" "}
                            {product.total_price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </ListItemText>
                        </span>
                      </ListItem>
                    </List>
                  )
                )
              )}
              <div className="">
                <div>
                  Tổng thanh toán:{" "}
                  {total.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default CheckOutList;
