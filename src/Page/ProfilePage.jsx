import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Paper, TextField, Avatar } from "@mui/material";
import {
  actionFetchSingleAccountAPI,
  actionFetchSingleAccountRedux,
} from "../Redux/Action/AccountAction";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { updateAccountAPI, getUsernameExists } from "../API/AccountAPI";
import { uploadImgAPI } from "../API/ImageAPI";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "../../src/css/Profile.css";

const ProfilePage = () => {
  const stateRedux = useSelector((state) => state);
  const dispatchRedux = useDispatch();
  const account = stateRedux.singleAccountReducer;
  const id = localStorage.getItem("id");
  const localAcc = JSON.parse(localStorage.getItem("initAcc") || "{}");
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState();
  const [previewAvatarFile, setPreviewAvatarFile] = useState();
  const phoneRegExp = /((84|0)[3|5|7|8|9])+([0-9]{8})\b/;
  const emailRegExp = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;

  useEffect(() => {
    if (id && id !== "") {
      dispatchRedux(actionFetchSingleAccountAPI(id));
    }
  }, []);

  if (!localStorage.getItem("initAcc")) {
    window.localStorage.setItem(
      "initAcc",
      JSON.parse(
        JSON.stringify(
          JSON.parse(localStorage.getItem("persist:root") || "{}")
            .singleAccountReducer
        )
      )
    );
  }

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

  let nameImage;
  const previewAvaName = previewAvatarFile
    ? previewAvatarFile.name
    : localAcc.urlAvatar;

  return (
    <Row className="profile-container">
      <Col xs={12} xl={8}>
        <Paper
          style={{
            marginTop: "0px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Formik
            // initialValues={valueAcc}
            initialValues={{
              firstName: localAcc.firstName,
              lastName: localAcc.lastName,
              mobile: localAcc.mobile,
              email: localAcc.email,
              address: localAcc.address,
            }}
            validationSchema={Yup.object({
              firstName: Yup.string(),
              lastName: Yup.string(),
              email: Yup.string().matches(emailRegExp, "Email không hợp lệ!"),
              address: Yup.string(),
              mobile: Yup.string().matches(
                phoneRegExp,
                "Số điện thoại không hợp lệ"
              ),
            })}
            onSubmit={async (values) => {
              try {
                if (previewAvatarFile) {
                  nameImage = await uploadImgAPI(previewAvatarFile);
                }
                const update = {
                  firstName: values.firstName
                    ? values.firstName
                    : account.firstName,
                  lastName: values.lastName
                    ? values.lastName
                    : account.lastName,
                  email: values.email ? values.email : account.email,
                  mobile: values.mobile ? values.mobile : account.mobile,
                  address: values.address ? values.address : account.address,
                  urlAvatar: nameImage ? nameImage : account.urlAvatar,
                };
                console.log("previewAvatarUrl", previewAvatarUrl);
                await updateAccountAPI(id, update).then((response) => {
                  if (
                    response !== null &&
                    response !== undefined &&
                    (nameImage ||
                      require(`../Assets/img/account-default-img.png`)) &&
                    (previewAvatarUrl
                      ? /data:image\/(png|jpg|jpeg)/.test(previewAvatarUrl)
                      : account.urlAvatar)
                    // require(`../Assets/img/account-default-img.png`))
                  ) {
                    window.localStorage.setItem(
                      "initAcc",
                      JSON.stringify(update)
                    );
                    toast.success("Thành công.", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    setTimeout(() => window.location.reload(), 1000);
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
            {({ values, dirty, isValid, initialValues, isSubmitting }) => (
              <Container>
                <Row>
                  <Col style={{ marginTop: 20 }}>
                    <Form>
                      <span>
                        <h2 className="infoTitle">THÔNG TIN TÀI KHOẢN</h2>
                      </span>
                      <Row>
                        <Col md={6} className="mb-3">
                          <Field
                            fullWidth
                            name="firstName"
                            type="text"
                            defaultValue={localAcc.firstName}
                            placeholder="Nhập tên"
                            label="Tên: "
                            component={CustomInput}
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <Field
                            fullWidth
                            name="lastName"
                            type="text"
                            defaultValue={localAcc.lastName}
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
                            defaultValue={localAcc.mobile}
                            label="Số điện thoại:"
                            component={CustomInput}
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <Field
                            fullWidth
                            className="input"
                            name="email"
                            type="email"
                            defaultValue={localAcc.email}
                            label="Email:"
                            component={CustomInput}
                          />
                        </Col>
                      </Row>
                      <Field
                        className="input"
                        fullWidth
                        name="address"
                        type="text"
                        defaultValue={localAcc.address}
                        label="Địa chỉ:"
                        component={CustomInput}
                      />

                      {/* Submit */}
                      <Row className="r">
                        <Button
                          className="submit-btn-profile"
                          type="submit"
                          disabled={
                            (previewAvaName == localAcc.urlAvatar &&
                              !dirty &&
                              JSON.stringify(values) ===
                                JSON.stringify(initialValues)) ||
                            !isValid
                          }
                        >
                          Lưu thay đổi
                        </Button>
                      </Row>
                      {/* {previewAvatarFile} */}
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
          {/* <span>
            <Avatar style={{ backgroundColor: "blue" }}>2</Avatar>
            <h2 style={{ display: "inline" }}>Ảnh đại diện</h2>
          </span> */}

          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={
                previewAvatarUrl
                  ? previewAvatarUrl
                  : account.urlAvatar
                  ? "http://localhost:8080/api/v1/fileUpload/files/" +
                    account.urlAvatar
                  : require(`../Assets/img/account-default-img.png`)
              }
              sx={{ width: 200, height: 200, marginTop: "20px" }}
            />
            <div className="mt-2">
              <Button
                onClick={() => avatarInputFile.current.click()}
                className="profile-picture"
              >
                <FileUploadIcon /> Chọn ảnh
              </Button>
              <input
                type="file"
                id="avatarInput"
                ref={avatarInputFile}
                onChange={onChangeAvatarInput}
                style={{ display: "none" }}
              />
            </div>
          </Container>
        </Paper>
      </Col>
    </Row>
  );
  // }
};

export default ProfilePage;
