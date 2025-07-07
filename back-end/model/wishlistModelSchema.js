import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items : [
{productId : String,
 productName: String,
  productDescription : String,
 productImage: [String],
  quantity: Number,
  productPrice: Number,
  total: Number
}
  ],
  totalprince : Number
},
{
    timestamps: true,
  }
);

export const wishlistModel = mongoose.model("wishlist", cartSchema);
