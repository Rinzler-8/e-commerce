import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import "./style.css";
import { useSelector } from "react-redux";
import "../FormStyle.css";

function UpdateInputProductForm(props) {
  let { onHandleUpdateProduct } = props;

  let listCategory = useSelector((state) => state.listCategoryReducer);
  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  let productUpdateInfo = useSelector((state) => state.formUpdateReducer.productUpdateInfo);

  // Tìm depid và posid để fill vào thẻ select
  let categoryIdUpdate = listCategory.find((cat) => cat.name === productUpdateInfo.categoryName).id;

  return (
    <div>
      {/* Formik */}
      <Formik
        initialValues={{
          Name: productUpdateInfo.name,
          Category: categoryIdUpdate,
        }}
        validationSchema={Yup.object({
          Name: Yup.string().min(6, "Phải từ 6 đến 50 ký tự!").max(50, "Phải từ 6 đến 50 ký tự!").required("Required"),
          Category: Yup.number().required("Pls, Select a Category"),
        })}
        onSubmit={(values) => {
          let productUpdateNew = {
            //FormForUpdating(backend): values.name
            name: values.Name,
            categoryId: values.Category,
          };
          console.log("Thông tin Product Sau khi chỉnh sửa: ", productUpdateNew);
          onHandleUpdateProduct(productUpdateNew);
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
                  <Field name="Name" type="text" placeholder="Nhập tên" label="Tên sản phẩm" component={InputComponent} />
                  {/* Category */}
                  <Field name="Category" placeholder="Chọn danh mục" label="Danh mục" listItem={listCategory} component={SelectComponent} />
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

export default UpdateInputProductForm;
