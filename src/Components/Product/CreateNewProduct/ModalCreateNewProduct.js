import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from "reactstrap";
import CreateInputFormComponent from "./CreateInputFormComponent";

function ModalCreateNewProduct(props) {
  let { onHandleCreateNewProduct } = props;
  // Quản lý trạng thái ẩn hiện Moadal
  let [showModal, SetShowModal] = useState(false);

  // Xử lý ẩn hiện modal
  let toggle = () => {
    SetShowModal(!showModal);
  };

  return (
    <Container>
      <br />
      <Button color="primary" onClick={toggle}>
        Create New Product
      </Button>
      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader>
          <h3>Create New Product</h3>
        </ModalHeader>
        <ModalBody>
          <CreateInputFormComponent onHandleCreateNewProduct={onHandleCreateNewProduct} />
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

export default ModalCreateNewProduct;
