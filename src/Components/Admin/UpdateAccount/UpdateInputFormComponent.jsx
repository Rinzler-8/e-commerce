import React, { useContext, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./style.css";
import { useSelector } from "react-redux";
import { getEmailExists, getUsernameExists } from "../../../API/AccountAPI";
import SelectUserStatus from "./SelectUserStatus";
import SelectUpdateRole from "./SelectUpdateRole";
import {
  actionFetchUserStatusAPI,
  actionFetchUserRolePI,
} from "../../../Redux/Action/EnumAction";
import "../FormStyle.css";
import AppContext from "../../../AppContext";

function UpdateInputFormComponent(props) {
  let { onHandleUpdateAccount } = props;
  const { dispatchRedux } = useContext(AppContext);
  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  let listUserStatus = useSelector((state) => state.userStatusReducer);
  let listRole = useSelector((state) => state.roleReducer);

  let accountUpdateInfo = useSelector(
    (state) => state.formUpdateReducer.accountUpdateInfo
  );
  let roles;
  if (accountUpdateInfo.role && accountUpdateInfo.role.length > 0) {
    for (let r of accountUpdateInfo.role) {
      // roles.push(r.name);
      roles = r.name;
    }
  } else {
    roles = "USER";
  }
  // const phoneRegExp = /((84|0)[3|5|7|8|9])+([0-9]{8})\b/;
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
          Status: accountUpdateInfo.status,
          Role: roles,
        }}
        validationSchema={Yup.object({
          Username: Yup.string().test(
            "checkUniqueUsername",
            "Tên người dùng đã được đăng ký!",
            async (username) => {
              // call api
              const isExists = await getUsernameExists(username);
              if (isExists && username === accountUpdateInfo.username) {
                return isExists;
              } else {
                return !isExists;
              }
            }
          ),
          Email: Yup.string()
            .matches(emailRegExp, "Email không hợp lệ!")

            .test(
              "checkUniqueEmail",
              "Email đã được đăng ký!",
              async (email) => {
                // call api
                const isExists = await getEmailExists(email);
                if (isExists && email === accountUpdateInfo.email) {
                  return isExists;
                } else {
                  return !isExists;
                }
              }
            ),
        })}
        onSubmit={(values) => {
          let rolesSubmit = [];
          rolesSubmit.push(values.Role);
          const accountUpdateNew = {
            //FormForUpdating(backend): values...
            username: values.Username
              ? values.Username
              : accountUpdateInfo.username,
            firstName: values.FirstName
              ? values.FirstName
              : accountUpdateInfo.firstName,
            lastName: values.LastName
              ? values.LastName
              : accountUpdateInfo.lastName,
            status: values.Status,
            role: rolesSubmit.length > 0 ? rolesSubmit : "USER",
            mobile: values.Mobile ? values.Mobile : accountUpdateInfo.mobile,
            email: values.Email ? values.Email : accountUpdateInfo.email,
            address: values.Address
              ? values.Address
              : accountUpdateInfo.address,
          };
          onHandleUpdateAccount(accountUpdateNew);
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ validateField, validateForm }) => (
          <Container className="custom-container-form-style">
            <Row className="form-wrapper-custom-style">
              <Col
                sm={{
                  offset: -3,
                  size: 8,
                }}
                style={{ width: "100%" }}
              >
                {/* Form thêm mới */}
                <Form>
                  {/* Role */}
                  <Field
                    fullWidth
                    name="Role"
                    placeholder="Chọn phân quyền"
                    label="Phân quyền:"
                    listItem={listRole}
                    component={SelectUpdateRole}
                  />
                  {/* Status */}
                  <Field
                    fullWidth
                    name="Status"
                    placeholder="Chọn trạng thái"
                    label="Trạng thái:"
                    listItem={listUserStatus}
                    component={SelectUserStatus}
                  />
                  <br />
                  <br />
                  {/* submit */}
                  <div className="modal-footer-btn-area">
                    <Button type="reset" className="btn-common btn-reset">
                      Đặt lại
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
