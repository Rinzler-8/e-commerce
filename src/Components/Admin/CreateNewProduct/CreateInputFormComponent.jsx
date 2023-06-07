import React, { useState } from "react";
import { Button, Container, Row, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import "./style.css";
import { useSelector } from "react-redux";
import "../FormStyle.css";

function CreateInputFormComponent(props) {
  let { onHandleCreateNewProduct } = props;

  // State quản lý đóng mở thông báo.
  let [showNotificationCreate, setShowNotificationCreate] = useState(false);

  let listCategory = useSelector((state) => state.listCategoryReducer);
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
        <ToastBody style={{ color: "black", fontSize: 25 }}>Create Product Success!!</ToastBody>
      </Toast>
      {/* Formik */}
      <Formik
        initialValues={{
          Name: "",
          Price: "",
          Info: "",
          Detail: "",
          RatingStar: "",
          ProductImage: "",
          Category: "",
        }}
        validationSchema={Yup.object({
          Name: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!").required("Khong duoc de trong ten san pham"),
          Price: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!").required("Khong duoc de trong gia san pham"),
          Info: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!").required("Required"),
          Detail: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!").required("Required"),
          RatingStar: Yup.string().max(1, "Only 1 to 5 stars"),
          ProductImage: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!"),
          Category: Yup.number().required("Pls, Select a Category"),
        })}
        onSubmit={(values, actions) => {
          // console.log("values: ", values);
          let productCreateNew = {
            name: values.Name,
            price: values.Price,
            info: values.Info,
            detail: values.Detail,
            ratingStar: values.RatingStar,
            imageName: values.ProductImage,
            categoryId: values.Category,
          };
          console.log("Thông tin Product tạo mới: ", productCreateNew);

          onHandleCreateNewProduct(productCreateNew);
          // Hiển thị thông báo
          setShowNotificationCreate(true);
          // Reset dữ liệu sau khi thêm, dùng hàm của formik để reset.
          actions.resetForm();
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ validateField, validateForm }) => (
          <Container className="custom-container-form-style">
            <Row className="form-wrapper-custom-style">
              <Col
                sm={{
                  offset: 2,
                  size: 8,
                }}
                style={{ marginLeft: 0, width: "100%" }}
              >
                {/* Form thêm mới */}
                <Form className="custom-style-input-width">
                  {/* name */}
                  <Field name="Name" type="text" placeholder="Enter name" label="Name:" component={InputComponent} />

                  {/* Price */}
                  <Field name="Price" type="text" placeholder="Enter Price" label="Price:" component={InputComponent} />

                  {/* Info */}
                  <Field name="Info" type="text" placeholder="Enter Info" label="Info:" component={InputComponent} />

                  {/* Detail */}
                  <Field name="Detail" type="text" placeholder="Enter Detail" label="Detail:" component={InputComponent} />

                  {/* Rating */}
                  <Field name="RatingStar" type="text" placeholder="Enter Rating" label="Rating:" component={InputComponent} />

                  {/* ProductImage */}
                  <Field name="ProductImage" type="text" placeholder="Enter ProductImage" label="ProductImage:" component={InputComponent} />

                  {/* Category */}
                  <Field name="Category" placeholder="Select a Category" label="Category:" listItem={listCategory} component={SelectComponent} />

                  {/* submit */}
                  <div className="modal-footer-btn-area" style={{ marginTop: 40 }}>
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

export default CreateInputFormComponent;
