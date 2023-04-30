import React from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

function OrderResultFormItem(props) {
  // Lấy các props từ bên trên truyền xuống
  let { onHandleEdit, onHandleDelete } = props;
  let stateRedux = useSelector((state) => state);
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  let listOrder = stateRedux.listOrderReducer;
  let handleDelete = (id) => {
    onHandleDelete(id);
  };

  let handleEditButton = (order) => {
    // dispatchRedux(actionShowUpdateForm());
    onHandleEdit(order);
  };
  // console.log("order: ", listOrder);
  let rowItem = "";
  if (listOrder) {
    rowItem = listOrder.map((order, index) => {
      return order.user_id == id || role == "ADMIN" ? (
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
              Sửa
            </Button>
            <Button color="danger" onClick={() => handleDelete(order)}>
              Hủy
            </Button>
          </td>
        </tr>
      ) : (
        <></>
      );
    });
  }
  return rowItem;
}

export default OrderResultFormItem;
