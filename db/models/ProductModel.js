import mongoose from "mongoose";

const ProductSchmea = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is required"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Price is reqiured"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
  },
  image: 
    {
      public_id: String,
      url: String,
    },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Array,
  },
});



export const Product = mongoose.model("product", ProductSchmea);
