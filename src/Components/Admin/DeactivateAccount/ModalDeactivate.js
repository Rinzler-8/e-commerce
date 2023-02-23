import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Input, Row, Col } from "reactstrap";
import { actionToggleDeactivateFormRedux } from "../../../Redux/Action/FormDeactivateAction";
import DeactivateInputFormComponent from "./DeactivateFormComponent";

function ModalDeactivateAccount(props) {
  let { onHandleDeactivateAccount } = props;

  let dispatchRedux = useDispatch();

  // Quản lý trạng thái ẩn hiện Moadal
  let stateRedux = useSelector((state) => state.formDeactivateReducer);
  let showModal = stateRedux.isShowFormDeactivate;

  // Xử lý ẩn hiện modal
  let toggle = () => {
    // Đóng form update
    dispatchRedux(actionToggleDeactivateFormRedux());
  };

  return (
    <Container>
      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader>
          <h3>Deactivate Account</h3>
        </ModalHeader>
        <ModalBody>
          <DeactivateInputFormComponent onHandleDeactivateAccount={onHandleDeactivateAccount} />
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

export default ModalDeactivateAccount;
