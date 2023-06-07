import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, Container} from "reactstrap";
import { actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";
import UpdateInputOrderForm from "./UpdateInputOrderForm";

function ModalUpdateOrder(props) {
  let { onHandleUpdateOrder } = props;

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
          <div>Cập nhật trạng thái</div>
        </ModalHeader>
        <ModalBody>
          <UpdateInputOrderForm onHandleUpdateOrder={onHandleUpdateOrder} />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default ModalUpdateOrder;
