import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, NavLink } from "reactstrap";
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
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
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
import { actionDeleteAllCartItemsAPI, actionCloseCart } from "../Redux/Action/CartAction";

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
        <TextField {...field} {...propsOther} variant="standard" style={{ marginBottom: "20px" }} />
        {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </div>
    );
  }
  if (cart) {
    return (
      <Grid container style={{ marginTop: "90px" }}>
        {/* SHIPPING INFORMATION */}
        <Grid item md={7}>
          <Paper style={{ marginRight: "80px", marginLeft: "300px", marginTop: "80px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                mobile: "",
                delivery_address: "",
                paymentType: "COD",
              }}
              validationSchema={Yup.object({
                first_name: Yup.string().required("Không được để trống first name"),
                last_name: Yup.string().required("Không được để trống last name"),

                delivery_address: Yup.string().required("Không được để trống address"),

                mobile: Yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ").required("Không được để trống số điện thoại"),
              })}
              onSubmit={(values) => {
                try {
                  const checkout = {
                    user_id: id,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    mobile: values.mobile,
                    delivery_address: values.delivery_address,
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
              {({ validateField, validateForm }) => (
                <Container>
                  <Row>
                    <Col style={{ marginTop: 60 }}>
                      <Form>
                        <span>
                          <Avatar style={{ backgroundColor: "blue" }}>1</Avatar>
                          <h3 className="shipping">THÔNG TIN GIAO HÀNG</h3>
                        </span>

                        <Field fullWidth name="first_name" type="text" label="Tên" component={CustomInput} />
                        <Field fullWidth name="last_name" type="text" placeholder="Nhập Họ" label="Họ:" component={CustomInput} />
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
                        <div>Payment Type</div>

                        <label className="payment">
                          COD
                          <Field type="radio" name="paymentType" value="COD" className="payment_radio" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="payment">
                          BANKING
                          <Field type="radio" name="paymentType" value="BANKING" className="payment_radio" />
                          <span className="checkmark"></span>
                        </label>
                        {/* Submit */}
                        <Row className="button">
                          <Button type="submit">Mua hàng</Button>
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
        </Grid>

        {/* ORDER SUMMARY */}
        <Grid item md={5}>
          <Paper style={{ marginRight: "200px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <Container className="summary_container">
              <div className="order_summary">thông tin đơn hàng</div>
              {cart.cartItems.map(
                (product, index) => (
                  (total += product.total_price),
                  (
                    <List key={index}>
                      <ListItem>
                        <div>
                          <NavLink href={`/products/${product.product_id}`}>
                            <img alt="Sample" src={"http://localhost:8080/api/v1/fileUpload/files/" + product.imageName} style={{ width: 100, height: 100 }} />
                          </NavLink>
                        </div>
                        <span>
                          <ListItemText>
                            <NavLink href={`/products/${product.product_id}`} style={{ padding: 0 }}>
                              <Typography style={{ fontSize: 20 }}>{product.productName}</Typography>
                            </NavLink>
                            <Typography>{product.price}đ</Typography>
                            <Typography>Số lượng: {product.quantity}</Typography>
                          </ListItemText>
                          <ListItemText>Số tiền: {product.total_price}đ</ListItemText>
                        </span>
                      </ListItem>
                    </List>
                  )
                )
              )}
              <div className="">
                <div>Estimated total: {total}đ</div>
              </div>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default CheckOutList;
