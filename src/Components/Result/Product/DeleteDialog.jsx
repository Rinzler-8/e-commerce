import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from "@mui/material";
import { IconButton, MenuItem, Select } from "@mui/material";

export default function DeleteDialog(props) {
  let { isDialogOpen, onHandleDelete, toggle, selectedProductId } = props;


  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  function handleDelete() {
    onHandleDelete(selectedProductId);
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
        <Typography>Bạn có chắc chắn muốn xóa sản phẩm (ID:{selectedProductId}) không?</Typography>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={toggleModal} color="primary">
          <Typography variant="button" style={{ color: "black" }}>
            HỦY
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
