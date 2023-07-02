import React, { useState } from "react";
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
import Rating from "@mui/material/Rating";
import "./ReviewDialog.scss";

export default function ReviewDialog(props) {
  const { isReviewOpen, onHandleReview, toggle, selectedOrder } = props;
  const stateRedux = useSelector((state) => state);
    const { dispatchRedux  } =
    useContext(AppContext);
  const orderItemsState = stateRedux.orderItemsReducer;
  const [ratingValue, setRatingValue] = useState([]);
  const [productId, setProductId] = useState();
  const [review, setReview] = useState([]);
  function toggleModal() {
    toggle(); // Call the toggle function from props
  }
  console.log("ratingValue", ratingValue);
  function handleReview() {
    let jsonBody = [];
    const submitReview = {
      productId: productId,
      sessionId: selectedOrder.sessionId,
      ratingStar: ratingValue,
      review: review,
    };
    jsonBody.push(submitReview);
    onHandleReview(submitReview);
  }

  useEffect(() => {
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
        style: { maxWidth: "1200px" },
      }}
    >
      <DialogTitle>
        <Typography>ĐÁNH GIÁ SẢN PHẨM</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>Thông tin đơn hàng:</Typography>
        {orderItemsState.map((item, index) => (
          <List key={index}>
            <ListItem>
              <div id="img-prod-review">
                <NavLink href={`/products/${item.productId}`}>
                  <img
                    alt="Sample"
                    src={
                      "http://localhost:8080/api/v1/fileUpload/files/" +
                      item.imageName
                    }
                  />
                </NavLink>
              </div>
              <div className="review-product-details">
                <ListItemText>
                  <NavLink
                    href={`/products/${item.productId}`}
                    style={{ padding: 0 }}
                  >
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
              </div>
            </ListItem>
            <div>
              <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                  setProductId(item.productId);
                }}
              />
              <TextareaAutosize
                minRows={4} // Set the desired number of rows
                placeholder="Ghi chú"
                variant="standard"
                value={review}
                onChange={(e, newValue) => setReview(newValue)}
                style={{ width: "100%" }}
              />
            </div>
          </List>
        ))}
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
