import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import "./style.css";
import { useSelector } from "react-redux";

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
                  {/* name */}
                  <Field name="Name" type="text" placeholder="Enter name" label="name:" component={InputComponent} />
                  {/* Category */}
                  <Field name="Category" placeholder="Select a Category" label="Category:" listItem={listCategory} component={SelectComponent} />
                  <br />
                  <br />
                  {/* submit */}
                  <Row>
                    <Col>
                      <Button color="success" type="submit">
                        Update
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

export default UpdateInputProductForm;
