import Product from "../model/productSchema.js";
import { wishlistModel } from "../model/wishlistModelSchema.js";




// ✅ Add product to wishlist
export const addToWishlist = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  console.log(productId)

  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "userId and productId are required" });
  }

  try {
    const product = await Product.findById(productId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

   

    let wishList = await wishlistModel.findOne({ userId });

    if (!wishList) {
      wishList = new wishlistModel({
        userId,
        items: [
          {
            productId,
            productName: product.productName,
            productImage: product.productImage,
             productDescription:  product.productDescription,
            quantity,
            productPrice: product.productPrice,
            total: product.productPrice * quantity
          }
        ],
        totalprince: product.productPrice * quantity
      });
    } else {
      const existingIndex = wishList.items.findIndex(item => item.productId === productId);

      if (existingIndex !== -1) {
        wishList.items[existingIndex].quantity += quantity;
        wishList.items[existingIndex].total =
          wishList.items[existingIndex].quantity * wishList.items[existingIndex].productPrice;
      } else {
        wishList.items.push({
          productId,
          productName: product.productName,
          productImage: product.productImage,
          quantity,
          productPrice: product.productPrice,
          total: product.productPrice * quantity
        });
      }

      wishList.totalprince = wishList.items.reduce((acc, item) => acc + item.total, 0);
    }

    await wishList.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully.",
      wishlist: wishList
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// ✅ Get wishlist by userId
export const getWishlistByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishList = await wishlistModel.findOne({ userId });
    if (!wishList) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    res.status(200).json({ success: true, wishlist: wishList });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// ✅ Remove a product from wishlist
export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const wishList = await wishlistModel.findOne({ userId });
    if (!wishList) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    wishList.items = wishList.items.filter(item => item.productId !== productId);

    // Recalculate total price
    wishList.totalprince = wishList.items.reduce((acc, item) => acc + item.total, 0);

    await wishList.save();

    res.status(200).json({ success: true, message: "Product removed from wishlist", wishlist: wishList });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// ✅ Clear entire wishlist
export const clearWishlist = async (req, res) => {
  const { userId } = req.body;

  try {
    const wishList = await wishlistModel.findOne({ userId });
    if (!wishList) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    wishList.items = [];
    wishList.totalprince = 0;

    await wishList.save();

    res.status(200).json({ success: true, message: "Wishlist cleared", wishlist: wishList });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

