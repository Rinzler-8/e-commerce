import React from "react";
import {
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextareaAutosize,
  ListItem,
  ListItemText,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetOrderItemsAPI } from "../../../Redux/Action/CheckoutAction";
import { NavLink } from "reactstrap";

export default function ReviewDialog(props) {
  const { isReviewOpen, onHandleReview, toggle, selectedOrder } = props;
  const stateRedux = useSelector((state) => state);
  const dispatchRedux = useDispatch();
  const orderItemsState = stateRedux.orderItemsReducer;
  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  function handleReview() {
    onHandleReview(selectedOrder);
  }

  useEffect(() => {
    console.log(selectedOrder)
    if (selectedOrder && selectedOrder.sessionId) {
      dispatchRedux(actionGetOrderItemsAPI(selectedOrder.sessionId));
    }
  }, [selectedOrder]);

  return (
    <Dialog
      open={isReviewOpen}
      onClose={toggleModal}
      PaperProps={{
        elevation: 8,
        style: { backgroundColor: "white" },
      }}
    >
      <DialogTitle>
        <Typography>ĐÁNH GIÁ SẢN PHẨM</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>Thông tin đơn hàng:</Typography>
        {orderItemsState.map((item, index) => (
          // console.log("item", item.price),
          <List key={index}>
            <ListItem>
              <div>
                <NavLink href={`/products/${item.id}`}>
                  <img
                    alt="Sample"
                    src={
                      "http://localhost:8080/api/v1/fileUpload/files/" +
                      item.imageName
                    }
                  />
                </NavLink>
              </div>
              <span>
                <ListItemText>
                  <NavLink href={`/products/${item.id}`} style={{ padding: 0 }}>
                    <Typography style={{ fontSize: 20 }}>
                      {item.productName}
                    </Typography>
                  </NavLink>
                  <ListItemText>
                    Giá tiền:{" "}
                    {(item.price * 1).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </ListItemText>
                  {/* <Typography>Giá tiền: {item.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</Typography> */}
                  <Typography>Mô tả: {item.info}</Typography>
                </ListItemText>
                <ListItemText>Số lượng: {item.quantity}</ListItemText>
                <ListItemText>
                  Tổng:
                  {(item.quantity * item.price).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </ListItemText>
              </span>
            </ListItem>
          </List>
        ))}
        <TextareaAutosize
          minRows={4} // Set the desired number of rows
          placeholder="Ghi chú"
          variant="standard"
          style={{ width: "100%" }}
        />
      </DialogContent>
      <DialogActions>
        <IconButton onClick={toggleModal} color="primary">
          <Typography variant="button" style={{ color: "black" }}>
            Đóng
          </Typography>
        </IconButton>
        <IconButton onClick={handleReview} color="primary" autoFocus>
          <Typography variant="button" color="success">
            Lưu
          </Typography>
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
