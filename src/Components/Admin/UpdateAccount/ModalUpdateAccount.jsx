import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";
import UpdateInputFormComponent from "./UpdateInputFormComponent";
import CloseIcon from "@mui/icons-material/Close";
import "../ModalStyle.css";
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
    <div className="modal-container-custom">
      <Modal isOpen={showModal} toggle={toggle} className="modal-wrapper-custom">
        <ModalHeader className="modal-header-custom">
          <div>Cập nhật tài khoản</div>
          <button onClick={toggle} className="close-btn">
            <CloseIcon />
          </button>
        </ModalHeader>
        <ModalBody>
          <UpdateInputFormComponent onHandleUpdateAccount={onHandleUpdateAccount} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalUpdateAccount;
