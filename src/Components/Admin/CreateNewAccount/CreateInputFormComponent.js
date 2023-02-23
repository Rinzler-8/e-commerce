import React, { useState } from "react";
import { Button, Container, Row, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import "./style.css";
import { getEmailExists, getUsernameExists, getMobileExists } from "../../../API/AccountAPI";

function CreateInputFormComponent(props) {
  let { onHandleCreateNewAccount } = props;

  // State quản lý đóng mở thông báo.
  let [showNotificationCreate, setShowNotificationCreate] = useState(false);

  return (
    <div>
      {/* Thông báo thêm mới thành công */}
      <Toast isOpen={showNotificationCreate}>
        <ToastHeader
          style={{ backgroundColor: "blue", color: "black", fontSize: 20 }}
          toggle={() => {
            setShowNotificationCreate(false);
          }}
        >
          Notification
        </ToastHeader>
        <ToastBody style={{ color: "black", fontSize: 25 }}>Create Account Success!!</ToastBody>
      </Toast>
      {/* Formik */}
      <Formik
        initialValues={{
          Email: "",
          Username: "",
          Fullname: "",
          Avatar: "",
          Mobile: "",
          Address: "",
        }}
        validationSchema={Yup.object({
          Email: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .email("Email trùng ")
            .required("Không được để trống Email"),
          // Check email exist
          // .test("checkUniqueEmail", "This email is already registered.", async (email) => {
          //   // call api
          //   const isExists = await getEmailExists(email);
          //   return !isExists;
          // }),
          Username: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Không được để trống Username"),
          // Check email exist
          // .test("checkUniqueUsername", "This username is already registered.", async (username) => {
          //   // call api
          //   const isExists = await getUsernameExists(username);
          //   return !isExists;
          // }),
          Fullname: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Không được để trống Fullname"),
          Avatar: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Không được để trống Avatar"),
          Mobile: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Không được để trống Mobile"),
          Address: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Không được để trống Address"),
        })}
        onSubmit={(values, actions) => {
          // console.log("values: ", values);
          let accountCreateNew = {
            email: values.Email,
            username: values.Username,
            fullname: values.Fullname,
            avatarImageName: values.Avatar,
            mobile: values.Mobile,
            address: values.Address,
          };
          console.log("Thông tin Account tạo mới: ", accountCreateNew);
          onHandleCreateNewAccount(accountCreateNew);
          // Hiển thị thông báo
          setShowNotificationCreate(true);
          // Reset dữ liệu sau khi thêm, dùng hàm của formik để reset.
          actions.resetForm();
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
                  {/* Email */}
                  <Field name="Email" type="text" placeholder="Enter Email" label="Email:" component={InputComponent} />

                  {/* Username */}
                  <Field name="Username" type="text" placeholder="Enter Username" label="Username:" component={InputComponent} />

                  {/* Fullname */}
                  <Field name="Fullname" type="text" placeholder="Enter Fullname" label="Fullname:" component={InputComponent} />

                  {/* AvaImage */}
                  <Field name="Avatar" type="text" placeholder="Enter Avatar" label="Avatar:" component={InputComponent} />

                  {/* Mobile */}
                  <Field name="Mobile" type="text" placeholder="Enter Mobile" label="Mobile:" component={InputComponent} />

                  {/* Address */}
                  <Field name="Address" type="text" placeholder="Enter Address" label="Address:" component={InputComponent} />

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

export default CreateInputFormComponent;
