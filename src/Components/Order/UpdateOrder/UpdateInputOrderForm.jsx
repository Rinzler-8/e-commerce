import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionFetchStatusAPI } from "../../../Redux/Action/OrderStatusAction";


function UpdateInputProductForm(props) {
  let { onHandleUpdateOrder } = props;
  let dispatchRedux = useDispatch();

  useEffect(() => {
    dispatchRedux(actionFetchStatusAPI());
  }, [])

  let listOrderStatus = useSelector((state) => state.orderStatusReducer);

  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  let orderUpdateInfo = useSelector((state) => state.formUpdateReducer.orderUpdateInfo);

  // Tìm depid và posid để fill vào thẻ select
  let orderStatusUpdate = listOrderStatus.find((status) => status === orderUpdateInfo.orderStatus);

  return (
    <div>
      {/* Formik */}
      <Formik
        initialValues={{
          Status: orderUpdateInfo.orderStatus,
        }}
        // validationSchema={Yup.object({
        //   Status: Yup.number().required("Pls, Select a Status"),
        // })}
        onSubmit={(values) => {
          let orderUpdateNew = {
            //FormForUpdating(backend): values.name
            orderStatus: values.Status,
          };
          console.log("Thông tin Order Sau khi chỉnh sửa: ", orderUpdateNew);
          onHandleUpdateOrder(orderUpdateNew);
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ validateField, validateForm, initialValues }) => (
          <Container>
            <Row>
              <Col
                sm={{
                  offset: 2,
                  size: 8,
                }}
              >
                <Form>
                  {/* Status */}
                  <Field name="Status" placeholder="Select a Status" label="Trạng thái đơn hàng:" listItem={listOrderStatus} component={SelectComponent} />
                  initial value: {orderStatusUpdate}
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
