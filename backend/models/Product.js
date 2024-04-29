import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  detail: String,
  ratingStar: Number,
  imageName: {
    type: String,
    required: true,
  },
  stockQty: {
    type: Number,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
