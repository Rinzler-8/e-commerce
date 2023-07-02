import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, Container } from "reactstrap";
import { actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";
import UpdateInputProductForm from "./UpdateInputProductForm";
import CloseIcon from "@mui/icons-material/Close";
import "../ModalStyle.css";
import AppContext from "../../../AppContext";

function ModalUpdateProduct(props) {
  let { onHandleUpdateProduct } = props;

  const { dispatchRedux } = useContext(AppContext);

  // Quản lý trạng thái ẩn hiện Moadal
  let showModal = useSelector(
    (state) => state.formUpdateReducer.isShowFormUpdate
  );

  // Xử lý ẩn hiện modal
  let toggle = () => {
    // Đóng form update
    dispatchRedux(actionToggleUpdateFormRedux());
  };

  return (
    <Container className="modal-container-custom">
      <Modal
        isOpen={showModal}
        toggle={toggle}
        className="modal-wrapper-custom"
      >
        <ModalHeader className="modal-header-custom">
          <div>Cập nhật sản phẩm</div>
          <button onClick={toggle} className="close-btn">
            <CloseIcon />
          </button>
        </ModalHeader>
        <ModalBody>
          <UpdateInputProductForm
            onHandleUpdateProduct={onHandleUpdateProduct}
          />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default ModalUpdateProduct;
