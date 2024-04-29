import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  session_id: {
    type: Number,
    ref: "Order",
  },
  productId: {
    type: Number,
  },
  review: String,
  rating: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
