import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import "./style.css";
import { useSelector } from "react-redux";

function DeactivateInputFormComponent(props) {
  let { onHandleDeactivateAccount } = props;

  // Lấy thông tin AccountDeactivateInfo từ Redux để fill dữ liệu
  let accountDeactivateInfo = useSelector((state) => state.formDeactivateReducer.accountDeactivateInfo);

  return (
    <div>
      {/* Formik */}
      <Formik
        initialValues={{
          //accountDeactivateInfo.Entity=>Account(backend)
          Fullname: accountDeactivateInfo.fullname,
          Avatar: accountDeactivateInfo.avatarImageName,
        }}
        validationSchema={Yup.object({
          Fullname: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Không được để trống fullname"),
          Avatar: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Không được để trống avatar"),
        })}
        onSubmit={(values) => {
          let accountDeactivateNew = {
            //FormForUpdating(backend): values...
            fullname: values.Fullname,
            avatarImageName: values.Avatar,
          };
          console.log("Thông tin Account Sau khi chỉnh sửa: ", accountDeactivateNew);
          onHandleDeactivateAccount(accountDeactivateNew);
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
                  {/* Fullname */}
                  <Field name="Fullname" type="radio" label="Active" component={InputComponent} />
                  <Field name="Fullname" type="radio" label="Deactivate" component={InputComponent} />
                  {/* Avatar */}
                  <Field name="banDays" type="text" placeholder="Enter Avatar" label="Ban Days:" component={InputComponent} />
                  <br />
                  <br />
                  {/* submit */}
                  <Row>
                    <Col>
                      <Button color="danger" type="submit">
                        Deactivate
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

export default DeactivateInputFormComponent;
