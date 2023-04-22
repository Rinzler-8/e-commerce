import React from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

function ProductResultFormItem(props) {
  // Lấy các props từ bên trên truyền xuống
  let { onHandleEdit, onHandleDelete } = props;
  let stateRedux = useSelector((state) => state);
  let listProduct = stateRedux.listProductReducer;
  let handleDelete = (id) => {
    onHandleDelete(id);
  };

  // Hàm xử lý khi click vào nút Edit
  let handleEditButton = (product) => {
    // dispatchRedux(actionShowUpdateForm());
    onHandleEdit(product);
  };

  // Khai báo item hiển thị dữ liệu
  let rowItem = "";
  // Kiểm tra nếu listProduct !="" sẽ hiển thị dữ liệu
  if (listProduct) {
    rowItem = listProduct.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.product_id}</td>
          <td>{product.name}</td>
          <td>{product.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</td>
          <td>{product.info}</td>
          <td>{product.detail}</td>
          <td>{product.ratingStar}</td>
          <td>
            <img alt="Sample" src= {"http://localhost:8080/api/v1/fileUpload/files/" + product.imageName} style={{ width: "150px", height: "150px" }} />
          </td>
          <td>{product.categoryName}</td>
          <td>
            <Button color="warning" onClick={() => handleEditButton(product)}>
              Edit
            </Button>
          </td>
          <td>
            <Button color="danger" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }
  return rowItem;
}

export default ProductResultFormItem;
