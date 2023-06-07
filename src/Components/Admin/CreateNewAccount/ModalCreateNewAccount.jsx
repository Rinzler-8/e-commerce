import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateInputFormComponent from "./CreateInputFormComponent";
import "../ModalStyle.css";
import CloseIcon from "@mui/icons-material/Close";

function ModalCreateNewAccount(props) {
  let { onHandleCreateNewAccount, toggle, showModal } = props;

  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  return (
    <div className="modal-container-custom">
      <Modal isOpen={showModal} toggle={toggleModal} className="modal-wrapper-custom">
        <ModalHeader className="modal-header-custom">
          <div>Tạo tài khoản mới</div>
          <button onClick={toggleModal} className="close-btn">
            <CloseIcon />
          </button>
        </ModalHeader>
        <ModalBody>
          <CreateInputFormComponent onHandleCreateNewAccount={onHandleCreateNewAccount} showModal={showModal} toggle= {toggle}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalCreateNewAccount;
