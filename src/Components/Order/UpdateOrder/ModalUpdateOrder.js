import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Input, Row, Col } from "reactstrap";
import { actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";
import UpdateInputProductForm from "./UpdateInputProductForm";

function ModalUpdateProduct(props) {
  let { onHandleUpdateProduct } = props;

  let dispatchRedux = useDispatch();

  // Quản lý trạng thái ẩn hiện Moadal
  let showModal = useSelector((state) => state.formUpdateReducer.isShowFormUpdate);

  // Xử lý ẩn hiện modal
  let toggle = () => {
    // Đóng form update
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  return (
    <Container>
      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader>
          <h3>Update Product</h3>
        </ModalHeader>
        <ModalBody>
          <UpdateInputProductForm onHandleUpdateProduct={onHandleUpdateProduct} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default ModalUpdateProduct;
