import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Input, Row, Col } from "reactstrap";
import { actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";
import UpdateInputFormComponent from "./UpdateInputFormComponent";

function ModalUpdateAccount(props) {
  let { onHandleUpdateAccount } = props;

  let dispatchRedux = useDispatch();

  // Quản lý trạng thái ẩn hiện Moadal
  let stateRedux = useSelector((state) => state.formUpdateReducer);
  let showModal = stateRedux.isShowFormUpdate;

  // Xử lý ẩn hiện modal
  let toggle = () => {
    // Đóng form update
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  return (
    <Container>
      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader>
          <h3>Update Account</h3>
        </ModalHeader>
        <ModalBody>
          <UpdateInputFormComponent onHandleUpdateAccount={onHandleUpdateAccount} />
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

export default ModalUpdateAccount;
