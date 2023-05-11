import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getEmailExists, getUsernameExists } from "../../../API/AccountAPI";
import SelectUserStatus from "./SelectUserStatus";
import SelectUpdateRole from "./SelectUpdateRole";
import { actionFetchUserStatusAPI, actionFetchUserRolePI } from "../../../Redux/Action/EnumAction";
import { IconButton, MenuItem, Select } from "@mui/material";

function UpdateInputFormComponent(props) {
  let { onHandleUpdateAccount } = props;
  let dispatchRedux = useDispatch();
  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  let listUserStatus = useSelector((state) => state.userStatusReducer);
  let listRole = useSelector((state) => state.roleReducer);
  console.log("role", listRole);

  let accountUpdateInfo = useSelector((state) => state.formUpdateReducer.accountUpdateInfo);
  let roles = [];
  for (let r of accountUpdateInfo.role) {
    roles.push(r.name);
  }

  const phoneRegExp = /((84|0)[3|5|7|8|9])+([0-9]{8})\b/;
  const emailRegExp = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;

  useEffect(() => {
    dispatchRedux(actionFetchUserStatusAPI());
    dispatchRedux(actionFetchUserRolePI());
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
          Role: roles,
          Email: accountUpdateInfo.email,
        }}
        validationSchema={Yup.object({
          Username: Yup.string()
            .min(6, "Phải từ 6 đến 50 ký tự!")
            .max(50, "Phải từ 6 đến 50 ký tự!")

            .test("checkUniqueUsername", "Tên người dùng đã được đăng ký!", async (username) => {
              // call api
              const isExists = await getUsernameExists(username);
              if (isExists && username == accountUpdateInfo.username) {
                return isExists;
              } else {
                return !isExists;
              }
            }),
          Email: Yup.string()
            .matches(emailRegExp, "Email không hợp lệ!")

            .test("checkUniqueEmail", "Email đã được đăng ký!", async (email) => {
              // call api
              const isExists = await getEmailExists(email);
              if (isExists && email == accountUpdateInfo.email) {
                return isExists;
              } else {
                return !isExists;
              }
            }),
          Firstname: Yup.string(),
          Lastname: Yup.string(),
          Mobile: Yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
          Address: Yup.string(),
        })}
        onSubmit={(values) => {
          let roles = [];
          roles.push(values.Role);
          const accountUpdateNew = {
            //FormForUpdating(backend): values...
            username: values.Username ? values.Username : accountUpdateInfo.username,
            firstName: values.FirstName ? values.FirstName : accountUpdateInfo.firstName,
            lastName: values.LastName ? values.LastName : accountUpdateInfo.lastName,
            status: values.Status,
            role: roles.length > 0 ? roles : ["USER"],
            mobile: values.Mobile ? values.Mobile : accountUpdateInfo.mobile,
            email: values.Email ? values.Email : accountUpdateInfo.email,
            address: values.Address ? values.Address : accountUpdateInfo.address,
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
                  <Field fullWidth name="Username" type="text" placeholder="Nhập tên tài khoản" label="Tên tài khoản:" component={InputComponent} />
                  {/* Email */}
                  <Field fullWidth name="Email" type="text" placeholder="Nhập email" label="Email:" component={InputComponent} />
                  {/* Fullname */}
                  <Field fullWidth name="FirstName" type="text" placeholder="Nhập tên" label="Tên: " component={InputComponent} />
                  <Field fullWidth name="LastName" type="text" placeholder="Nhập họ" label="Họ:" component={InputComponent} />
                  {/* Mobile */}
                  <Field fullWidth name="Mobile" type="text" placeholder="Nhập số điện thoại" label="Số điện thoại:" component={InputComponent} />
                  {/* Address */}
                  <Field fullWidth name="Address" type="text" placeholder="Nhập địa chỉ" label="Địa chỉ:" component={InputComponent} />
                  {/* Status */}
                  <Field fullWidth name="Status" placeholder="Chọn trạng thái" label="Trạng thái:" listItem={listUserStatus} component={SelectUserStatus} />
                  {/* Role */}
                  <Field fullWidth name="Role" placeholder="Chọn phân quyền" label="Phân quyền:" listItem={listRole} component={SelectUpdateRole} />
                  <br />
                  <br />
                  {/* submit */}
                  <div className="modal-footer-btn-area">
                    <Button type="reset" className="btn-common btn-reset">
                      Reset
                    </Button>
                    <Button type="submit" className="btn-common btn-save">
                      Lưu
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    </div>
  );
}

export default UpdateInputFormComponent;
