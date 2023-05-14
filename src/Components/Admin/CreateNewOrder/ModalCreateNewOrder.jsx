import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from "reactstrap";
import CreateInputFormComponent from "./CreateInputFormComponent";

function ModalCreateNewOrder(props) {
  let { onHandleCreateNewOrder } = props;
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
        Create New Order
      </Button>
      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader>
          <div>Create New Order</div>
        </ModalHeader>
        <ModalBody>
          <CreateInputFormComponent onHandleCreateNewOrder={onHandleCreateNewOrder} />
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

export default ModalCreateNewOrder;
