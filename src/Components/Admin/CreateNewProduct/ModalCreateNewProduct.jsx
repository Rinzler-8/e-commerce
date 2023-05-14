import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from "reactstrap";
import CreateInputFormComponent from "./CreateInputFormComponent";

function ModalCreateNewProduct(props) {
  let { onHandleCreateNewProduct, toggle, showModal } = props;

  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  return (
    <Container>
      <br />
      <Button color="primary" onClick={toggle}>
        Tạo sản phẩm mới
      </Button>
      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader>
          <div>Tạo sản phẩm mới</div>
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
