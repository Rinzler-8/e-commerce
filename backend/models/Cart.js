import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    // price
    //   imageName
    //   info
    //   detail
    //   productId
    //   product_name
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
