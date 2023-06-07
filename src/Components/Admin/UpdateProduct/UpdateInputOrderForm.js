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

  let listManufacturer = useSelector((state) => state.listManufacturerReducer);

  let listCategory = useSelector((state) => state.listCategoryReducer);

  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  let productUpdateInfo = useSelector((state) => state.formUpdateReducer.productUpdateInfo);

  // Tìm depid và posid để fill vào thẻ select
  let manufacturerIdUpdate = listManufacturer.find((man) => man.name === productUpdateInfo.manufacturerName).id; //manufacturerName from ProductDto
  let categoryIdUpdate = listCategory.find((cat) => cat.name === productUpdateInfo.categoryName).id;

  return (
    <div>
      {/* Formik */}
      <Formik
        initialValues={{
          Name: productUpdateInfo.name,
          Manufacturer: manufacturerIdUpdate,
          Category: categoryIdUpdate,
        }}
        validationSchema={Yup.object({
          Name: Yup.string().min(6, "Must be between 6 and 50 characters").max(50, "Must be between 6 and 50 characters").required("Required"),
          Manufacturer: Yup.number().required("Pls, Select a Manufacturer"),
          Category: Yup.number().required("Pls, Select a Category"),
        })}
        onSubmit={(values) => {
          let productUpdateNew = {
            //FormForUpdating(backend): values.name
            name: values.Name,
            categoryId: values.Category,
            manufacturerId: values.Manufacturer,
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
                  {/* Manufacturer */}
                  <Field
                    name="Manufacturer"
                    placeholder="Select a Manufacturer"
                    label="Manufacturer:"
                    listItem={listManufacturer}
                    component={SelectComponent}
                  />
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
