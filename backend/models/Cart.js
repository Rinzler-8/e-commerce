import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
  // Virtual fields
  price: {
    type: Number,
    get() {
      return this.getProduct().price;
    },
  },
  imageName: {
    type: String,
    get() {
      return this.getProduct().imageName;
    },
  },
  info: {
    type: String,
    get() {
      return this.getProduct().info;
    },
  },
  detail: {
    type: String,
    get() {
      return this.getProduct().detail;
    },
  },
  productId: {
    type: Number,
    get() {
      return this.getProduct().productId;
    },
  },
  product_name: {
    type: String,
    get() {
      return this.getProduct().name;
    },
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
