import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from "reactstrap";
import CreateInputFormComponent from "./CreateInputFormComponent";
import "../ModalStyle.css";
import CloseIcon from "@mui/icons-material/Close";

function ModalCreateNewProduct(props) {
  let { onHandleCreateNewProduct, toggle, showModal } = props;

  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  return (
    <Container className="modal-container-custom">
      <Button color="primary" onClick={toggle}>
        Tạo sản phẩm mới
      </Button>
      <Modal isOpen={showModal} toggle={toggle} className="modal-wrapper-custom">
        <ModalHeader className="modal-header-custom">
          <div>Tạo sản phẩm mới</div>
          <button onClick={toggle} className="close-btn">
            <CloseIcon />
          </button>
        </ModalHeader>
        <ModalBody>
          <CreateInputFormComponent onHandleCreateNewProduct={onHandleCreateNewProduct} />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default ModalCreateNewProduct;
