import React, { useContext } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import SelectOrderStatus from "./SelectOrderStatus";
import "./style.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { actionFetchStatusAPI } from "../../../../redux/Action/EnumAction";
import AppContext from "../../../../AppContext";

function UpdateInputProductForm(props) {
  const { onHandleUpdateOrder } = props;
  const { dispatchRedux } = useContext(AppContext);

  useEffect(() => {
    dispatchRedux(actionFetchStatusAPI());
  }, []);

  let listOrderStatus = useSelector((state) => state.orderStatusReducer);

  // Lấy thông tin AccountUpdateInfo từ Redux để fill dữ liệu
  const orderUpdateInfo = useSelector(
    (state) => state.formUpdateReducer.orderUpdateInfo
  );

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
                style={{ width: "100%" }}
              >
                <Form>
                  {/* Status */}
                  <Field
                    name="Status"
                    placeholder="Select a Status"
                    label="Trạng thái đơn hàng:"
                    listItem={listOrderStatus}
                    component={SelectOrderStatus}
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

export default UpdateInputProductForm;
