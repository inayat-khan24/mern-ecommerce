import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required:true
  },
  productDescription: {
    type: String,
    required:  true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  productSubCategory: {
    type: String,
    required: true
  },
  productStock: {
    type: Number,
    required:  true
  },
  productQuantity: {
    type: Number,
    required:  true
  },
  productImage: {
    // type : String,
    type: [String], 
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);

export default Product;
