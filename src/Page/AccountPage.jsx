import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Paper, TextField, Avatar } from "@mui/material";
import { actionFetchSingleAccountAPI, actionFetchSingleAccountRedux } from "../Redux/Action/AccountAction";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { updateAccountAPI, getUsernameExists } from "../API/AccountAPI";
import { uploadImgAPI } from "../API/ImageAPI";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "../../src/css/Profile.css";

const AccountPage = () => {
  const stateRedux = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const account = stateRedux.singleAccountReducer;
  const id = localStorage.getItem("id");
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState();

  const [previewAvatarFile, setPreviewAvatarFile] = useState();

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

  const avatarInputFile = useRef(null);

  const onChangeAvatarInput = (e) => {
    // Assuming only image
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setPreviewAvatarUrl(reader.result);
      setPreviewAvatarFile(file);
    };
  };

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
              // first_name: 'account.firstName',
              // last_name: "account.lastName",
              // mobile: '1234567891',
              // email: 'account.email@gmail.com',
              // address: 'account.address',
            }}
            validationSchema={Yup.object({
              first_name: Yup.string(),
              last_name: Yup.string(),
              email: Yup.string(),
              address: Yup.string(),
              mobile: Yup.string().min(6, "Phải đủ 10 ký tự.").max(10, "Phải đủ 10 ký tự."),
            })}
            onSubmit={async (values) => {
              try {
                let nameImage = await uploadImgAPI(previewAvatarFile);
                console.log("value: ", values.first_name);
                const update = {
                  firstName: values.first_name ? values.first_name : account.firstName,
                  lastName: values.last_name ? values.last_name : account.lastName,
                  email: values.email ? values.email : account.email,
                  mobile: values.mobile ? values.mobile : account.mobile,
                  address: values.address ? values.address : account.address,
                  urlAvatar: nameImage ? nameImage : account.urlAvatar,
                };
                await updateAccountAPI(id, update).then((response) => {
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
                        <Button type="submit">Lưu thay đổi</Button>
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
        <Paper style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
          <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* src={previewAvatarUrl ? previewAvatarUrl : (userInfo.avatarUrl ? `http://127.0.0.1:8887/Avatar/${userInfo.avatarUrl}` : avatar1)} */}
            <Avatar
              alt="Remy Sharp"
              src={
                previewAvatarUrl
                  ? previewAvatarUrl
                  : account.urlAvatar
                  ? "http://localhost:8080/api/v1/fileUpload/files/" + account.urlAvatar
                  : "http://localhost:8080/api/v1/fileUpload/files/polish.png"
              }
              sx={{ width: 200, height: 200 }}
            />
            <div className="mt-2">
              <Button color="primary" onClick={() => avatarInputFile.current.click()}>
                <FileUploadIcon /> Upload
              </Button>
              <input type="file" id="avatarInput" ref={avatarInputFile} onChange={onChangeAvatarInput} style={{ display: "none" }} />
            </div>
          </Container>
        </Paper>
      </Col>
    </Row>
  );
  // }
};

export default AccountPage;
