import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { actionDeleteAccountAPI } from "../../../Redux/Action/AccountAction";
import { getEmailExists, getUsernameExists } from "../../../API/AccountAPI";
import SelectComponent from "./SelectComponent";
import { actionFetchUserStatusAPI } from "../../../Redux/Action/UserStatusAction";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from "@mui/material";
import { IconButton, MenuItem, Select } from "@mui/material";
import { actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";

function UpdateInputFormComponent(props) {
  let { onHandleUpdateAccount } = props;
  let dispatchRedux = useDispatch();
  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  let listUserStatus = useSelector((state) => state.userStatusReducer);

  let accountUpdateInfo = useSelector((state) => state.formUpdateReducer.accountUpdateInfo);

  console.log("listUserStatus:", accountUpdateInfo);
  const phoneRegExp = /((84|0)[3|5|7|8|9])+([0-9]{8})\b/;
  const emailRegExp = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  let onHandleDelete = () => {
    dispatchRedux(actionDeleteAccountAPI(accountUpdateInfo.id));
    handleCloseDialog();
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  const handleOpenDialog = (id, status) => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    dispatchRedux(actionFetchUserStatusAPI());
  }, []);

  return (
    <div>
      {/* Formik */}
      <Formik
        initialValues={{
          //accountUpdateInfo.Entity=>Account(backend)
          Username: accountUpdateInfo.username,
          Status: accountUpdateInfo.status,
          FirstName: accountUpdateInfo.firstName,
          LastName: accountUpdateInfo.lastName,
          Mobile: accountUpdateInfo.mobile,
          Email: accountUpdateInfo.email,
        }}
        validationSchema={Yup.object({
          Username: Yup.string()
            .min(6, "Phải từ 6 đến 50 ký tự!")
            .max(50, "Phải từ 6 đến 50 ký tự!")
            .required("Trường này là bắt buộc!")
            // .test("checkUniqueUsername", "Tên người dùng đã được đăng ký!", async (username) => {
            //   // call api
            //   const isExists = await getUsernameExists(username);
            //   return !isExists;
            // })
            ,

          Email: Yup.string().matches(emailRegExp, "Email không hợp lệ!").required("Trường này là bắt buộc!"),
          // .test("checkUniqueEmail", "Email đã được đăng ký!", async (email) => {
          //   // call api
          //   const isExists = await getEmailExists(email);
          //   return !isExists;
          // }),
          // .when("Email", {
          //   is: (val) => (val && val.length > 0 ? true : false),
          //   then: Yup.string().oneOf([Yup.ref("Email")], "Mật khẩu không khớp!"),
          // })
          Firstname: Yup.string(),
          Lastname: Yup.string(),
          Mobile: Yup.string().required("Trường này là bắt buộc!").matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
          Address: Yup.string(),
        })}
        onSubmit={(values) => {
          let accountUpdateNew = {
            //FormForUpdating(backend): values...
            username: values.Username,
            // avatarURL: values.Avatar,
            mobile: values.Mobile,
            email: values.Email,
          };
          onHandleUpdateAccount(accountUpdateNew);
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ validateField, validateForm }) => (
          <Container>
            <Row>
              <Col
                sm={{
                  offset: -3,
                  size: 8,
                }}
              >
                {/* Form thêm mới */}
                <Form>
                  {/* Username */}
                  <Field fullWidth name="Username" type="text" placeholder="Nhập tên tài khoản: " label="Username:" component={InputComponent} />
                  {/* Fullname */}
                  <Field fullWidth name="FirstName" type="text" placeholder="Nhập tên" label="Tên: " component={InputComponent} />
                  <Field fullWidth name="LastName" type="text" placeholder="Nhập họ" label="Họ:" component={InputComponent} />
                  {/* Status */}
                  <Field fullWidth name="Status" placeholder="Select a Status" label="Trạng thái:" listItem={listUserStatus} component={SelectComponent} />
                  {/* Mobile */}
                  <Field fullWidth name="Mobile" type="text" placeholder="Nhập số điện thoại:" label="Số điện thoại:" component={InputComponent} />
                  {/* Email */}
                  <Field fullWidth name="Email" type="text" placeholder="Nhập email:" label="Email:" component={InputComponent} />
                  <br />
                  <br />
                  {/* submit */}
                  <Row>
                    <Col>
                      <Button color="success" type="submit">
                        Save
                      </Button>
                    </Col>
                    <Col>
                      <Button color="danger" onClick={handleOpenDialog}>
                        Xóa
                      </Button>
                    </Col>
                    <Col>
                      <Button color="primary" type="reset">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Dialog
              open={isDialogOpen}
              onClose={handleCloseDialog}
              PaperProps={{
                elevation: 8,
                style: { backgroundColor: "white" },
              }}
            >
              <DialogTitle disableTypography>
                <Typography variant="h6" color="error">
                  XÁC NHẬN XÓA
                </Typography>
              </DialogTitle>
              <DialogContent dividers>
                <Typography variant="body1">Bạn có chắc chắn muốn xóa tài khoản này không?</Typography>
              </DialogContent>
              <DialogActions>
                <IconButton onClick={handleCloseDialog} color="primary">
                  <Typography variant="button" style={{ color: "black" }}>
                    HỦY
                  </Typography>
                </IconButton>
                <IconButton onClick={onHandleDelete} color="primary" autoFocus>
                  <Typography variant="button" color="error">
                    XÓA
                  </Typography>
                </IconButton>
              </DialogActions>
            </Dialog>
          </Container>
        )}
      </Formik>
    </div>
  );
}

export default UpdateInputFormComponent;
