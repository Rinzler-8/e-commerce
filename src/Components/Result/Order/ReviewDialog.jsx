import React, { useContext, useState } from "react";
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
import {  useSelector } from "react-redux";
import { actionGetOrderItemsAPI } from "../../../Redux/Action/CheckoutAction";
import { NavLink } from "reactstrap";
import Rating from "@mui/material/Rating";
import "./ReviewDialog.scss";
import AppContext from "../../../AppContext";

export default function ReviewDialog(props) {
  const { isReviewOpen, onHandleReview, toggle, selectedOrder } = props;
  const stateRedux = useSelector((state) => state);
  const { dispatchRedux } = useContext(AppContext);
  const orderItemsState = stateRedux.orderItemsReducer;
  const [productReviews, setProductReviews] = useState([]);

  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  function handleReview() {
    const reviews = productReviews.map((productReview) => ({
      productId: productReview.productId,
      sessionId: selectedOrder.sessionId,
      rating: productReview.ratingStar,
      review: productReview.review,
    }));

    onHandleReview(reviews);
  }

  const handleRatingChange = (newValue, productId) => {
    const existingReview = productReviews.find(
      (productReview) => productReview.productId === productId
    );

    if (existingReview) {
      // Update the rating value of the existing review
      const updatedReviews = productReviews.map((productReview) =>
        productReview.productId === productId
          ? { ...productReview, ratingStar: newValue }
          : productReview
      );
      setProductReviews(updatedReviews);
    } else {
      // Add a new review to the productReviews array
      const newReview = {
        productId: productId,
        ratingStar: newValue,
        review: "", // Add any default review value here
      };
      const updatedReviews = [...productReviews, newReview];
      setProductReviews(updatedReviews);
    }
  };

  const handleReviewChange = (newValue, productId) => {
    const updatedReviews = productReviews.map((productReview) => {
      if (productReview.productId === productId) {
        return {
          ...productReview,
          review: newValue,
        };
      }
      return productReview;
    });

    setProductReviews(updatedReviews);
  };

  const handleReviewInput = (input, productId) => {
    const updatedReviews = productReviews.map((productReview) => {
      if (productReview.productId === productId) {
        return {
          ...productReview,
          review: input,
        };
      }
      return productReview;
    });

    setProductReviews(updatedReviews);
  };

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
        {orderItemsState.map((item, index) => {
          let ratingValue, review;
          if (productReviews.length > 0) {
            const productReview = productReviews.find(
              (pr) => pr.productId === item.productId
            );
            ratingValue = productReview ? productReview.ratingStar : 0;
            review = productReview ? productReview.review : "";
          }
          return (
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
                  name={`rating-${item.productId}`}
                  value={ratingValue ? ratingValue : 0}
                  onChange={(event, newValue) =>
                    handleRatingChange(newValue, item.productId)
                  }
                />
                <TextareaAutosize
                  minRows={4} // Set the desired number of rows
                  placeholder="Ghi chú"
                  variant="standard"
                  value={review}
                  onChange={(event) =>
                    handleReviewInput(event.target.value, item.productId)
                  }
                  onBlur={(event) =>
                    handleReviewChange(event.target.value, item.productId)
                  }
                  style={{ width: "100%" }}
                />
              </div>
            </List>
          );
        })}
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
