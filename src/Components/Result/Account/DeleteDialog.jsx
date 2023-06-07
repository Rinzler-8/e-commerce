import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { IconButton } from "@mui/material";

export default function DeleteDialog(props) {
  let { isDialogOpen, onHandleDelete, toggle, selectedAccountId } = props;


  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  function handleDelete() {
    onHandleDelete(selectedAccountId);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onClose={toggleModal}
      PaperProps={{
        elevation: 8,
        style: { backgroundColor: "white" },
      }}
    >
      <DialogTitle>
        <Typography color="error">
          XÁC NHẬN XÓA
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>Bạn có chắc chắn muốn xóa tài khoản (ID:{selectedAccountId}) không?</Typography>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={toggleModal} color="primary">
          <Typography variant="button" style={{ color: "black" }}>
            ĐÓNG
          </Typography>
        </IconButton>
        <IconButton onClick={handleDelete} color="primary" autoFocus>
          <Typography variant="button" color="error">
            XÓA
          </Typography>
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
