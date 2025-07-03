import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: String,
  productImage: [String],
  productPrice: Number,
  quantity: {
    type: Number,
    default: 1
  },
  total: Number
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  cartItems: [cartItemSchema],
  totalPrice: Number
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
