import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      maxlength: 10,
    },
    note: String,
    delivery_address: String,
    user_id: Number,
    payment_type: {
      type: Number,
      required: true,
    },
    session_id: Number,
    created_at: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Number,
      required: true,
    },
    items: Object,
  },
  { timestamps: true }
);

// item_id: {
//   type: Number,
//   required: true,
// },
// id: Number, // Assuming this is a reference to the order ID
// session_id: Number,
// quantity: {
//   type: Number,
//   required: true,
// },

const Order = mongoose.model("Order", orderSchema);

export default Order;
