import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "./InputComponent";
import SelectOrderStatus from "./SelectOrderStatus";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionFetchStatusAPI } from "../../../Redux/Action/EnumAction";

function UpdateInputProductForm(props) {
  const { onHandleUpdateOrder } = props;
  const dispatchRedux = useDispatch();

  useEffect(() => {
    dispatchRedux(actionFetchStatusAPI());
  }, []);

  let listOrderStatus = useSelector((state) => state.orderStatusReducer);

  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  const orderUpdateInfo = useSelector((state) => state.formUpdateReducer.orderUpdateInfo);

  // Tìm depid và posid để fill vào thẻ select
  let orderStatusUpdate = listOrderStatus.find((status) => status === orderUpdateInfo.orderStatus);

  const statusMapping = {
    PENDING: ["PENDING", "CONFIRMED", "CANCELED"],
    CONFIRMED: ["CONFIRMED", "SHIPPED", "CANCELED"],
    SHIPPED: ["SHIPPED", "DELIVERING"],
    DELIVERING: ["DELIVERING", "DELIVERED"],
  };
  
  listOrderStatus = statusMapping[orderUpdateInfo.orderStatus] || [];

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
          // console.log("Thông tin Order Sau khi chỉnh sửa: ", orderUpdateNew);
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
                  offset: -3,
                  size: 8,
                }}
              >
                <Form>
                  {/* Status */}
                  <Field name="Status" placeholder="Select a Status" label="Trạng thái đơn hàng:" listItem={listOrderStatus} component={SelectOrderStatus}/>
                  <br />
                  <br />
                  {/* submit */}
                  <Row>
                    <Col>
                      <Button color="success" type="submit">
                        Cập nhật
                      </Button>
                    </Col>
                    <Col>
                      <Button color="primary" type="reset">
                        Đặt lại
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
