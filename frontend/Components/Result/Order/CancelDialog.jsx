import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { IconButton } from "@mui/material";

export default function CancelDialog(props) {
  let { isCancelOpen, onHandleCancel, toggle, selectedOrder } = props;


  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  function handleCancel() {
    onHandleCancel(selectedOrder.id);
  }

  return (
    <Dialog
      open={isCancelOpen}
      onClose={toggleModal}
      PaperProps={{
        elevation: 8,
        style: { backgroundColor: "white" },
      }}
    >
      <DialogTitle>
        <Typography color="error">
          XÁC NHẬN HỦY ĐƠN
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>Bạn có chắc chắn muốn hủy đơn (ID:{selectedOrder ? selectedOrder.id : null}) không?</Typography>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={toggleModal} color="primary">
          <Typography variant="button" style={{ color: "black" }}>
            Đóng
          </Typography>
        </IconButton>
        <IconButton onClick={handleCancel} color="primary" autoFocus>
          <Typography variant="button" color="error">
            Hủy
          </Typography>
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
