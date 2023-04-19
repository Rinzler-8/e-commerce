import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { actionDeleteAccountAPI } from "../../../Redux/Action/AccountAction";

function UpdateInputFormComponent(props) {
  let { onHandleUpdateAccount } = props;
  let dispatchRedux = useDispatch();
  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  let accountUpdateInfo = useSelector((state) => state.formUpdateReducer.accountUpdateInfo);

  let onHandleDelete = (id) => {
    console.log("Id của Account cần xóa:", id);
    alert("Bạn đã chắc chắn muốn xóa?");
    dispatchRedux(actionDeleteAccountAPI(id));
    // setShowNotificationDelete(true);
  };

  const actionStyling = {
    marginLeft: "10px",
  };

  return (
    <div>
      {/* Formik */}
      <Formik
        initialValues={{
          //accountUpdateInfo.Entity=>Account(backend)
          Username: accountUpdateInfo.username,
          Avatar: accountUpdateInfo.avatarURL,
          Mobile: accountUpdateInfo.mobile,
          Email: accountUpdateInfo.email,
        }}
        validationSchema={Yup.object({
          Username: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!").required("Không được để trống username"),
          Avatar: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!"),
          Mobile: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!").required("Không được để trống mobile"),
          Email: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!").required("Không được để trống email"),
        })}
        onSubmit={(values) => {
          let accountUpdateNew = {
            //FormForUpdating(backend): values...
            username: values.Username,
            avatarURL: values.Avatar,
            mobile: values.Mobile,
            email: values.Email,
          };
          console.log("Thông tin Account Sau khi chỉnh sửa: ", accountUpdateNew);
          onHandleUpdateAccount(accountUpdateNew);
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ validateField, validateForm }) => (
          <Container>
            <Row>
              <Col
                sm={{
                  offset: 2,
                  size: 8,
                }}
              >
                {/* Form thêm mới */}
                <Form>
                  {/* Username */}
                  <Field name="Username" type="text" placeholder="Enter Username" label="Username:" component={InputComponent} />
                  {/* Avatar */}
                  <Field name="Avatar" type="text" placeholder="Enter Avatar" label="Avatar:" component={InputComponent} />
                  {/* Mobile */}
                  <Field name="Mobile" type="text" placeholder="Enter Mobile" label="Mobile:" component={InputComponent} />
                  {/* Email */}
                  <Field name="Email" type="text" placeholder="Enter Email" label="Email:" component={InputComponent} />
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
                      <Button color="danger" onClick={() => onHandleDelete(accountUpdateInfo.id)}>
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
          </Container>
        )}
      </Formik>
    </div>
  );
}

export default UpdateInputFormComponent;
