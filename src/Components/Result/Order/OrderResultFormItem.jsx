import React from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

function OrderResultFormItem(props) {
  // Lấy các props từ bên trên truyền xuống
  let { onHandleEdit, onHandleDelete } = props;
  let stateRedux = useSelector((state) => state);
  let listOrder = stateRedux.listOrderReducer;
  // console.log("listOrder: ", listOrder)
  let handleDelete = (id) => {
    onHandleDelete(id);
  };

  // Hàm xử lý khi click vào nút Edit
  let handleEditButton = (order) => {
    // dispatchRedux(actionShowUpdateForm());
    onHandleEdit(order);
  };
console.log("order: ", listOrder);
  // Khai báo item hiển thị dữ liệu
  let rowItem = "";
  // Kiểm tra nếu listOrder !="" sẽ hiển thị dữ liệu
  if (listOrder) {
    rowItem = listOrder.map((order, index) => {
      return (
        <tr key={index}>
          <td>{order.order_id}</td>
          <td>{order.session_id}</td>
          <td>{order.first_name}</td>
          <td>{order.last_name}</td>
          <td>{order.mobile}</td>
          <td>{order.delivery_address}</td>
          <td>{order.paymentType}</td>
          <td>{order.orderStatus}</td>
          <td>{order.created_At}</td>
          <td>{order.note}</td>
          <td>
            <Button color="warning" onClick={() => handleEditButton(order)}>
              Edit
            </Button>
            <Button color="danger" onClick={() => handleDelete(order.id)}>
              Delete
            </Button>
          </td>

        </tr>
      );
    });
  }
  return rowItem;
}

export default OrderResultFormItem;
