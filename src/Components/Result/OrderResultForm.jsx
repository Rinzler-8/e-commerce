import React from "react";
import { Table, Container } from "reactstrap";
import OrderResultFormItem from "./OrderResultFormItem";

function OrderResultForm(props) {
  let { onHandleDelete, onHandleEdit } = props;
  return (
    <Container>
      <br />
      <h3>Danh sách Order</h3>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Phiên</th>
            <th>Tên</th>
            <th>Họ</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ nhận hàng</th>
            <th>Phương thức thanh toán</th>
            <th>Ngày tạo</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          <OrderResultFormItem onHandleDelete={onHandleDelete} onHandleEdit={onHandleEdit} />
        </tbody>
      </Table>
    </Container>
  );
}

export default OrderResultForm;
