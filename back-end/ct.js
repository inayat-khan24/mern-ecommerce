import Product from "../model/productSchema.js";
import { wishlistModel } from "../model/wishlistModelSchema.js";



export const addToWishlist = async (req, res) => {
  const { userId, productId, } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "userId and productId are required"
    });
  }

  try {
    // Step 1: Get product detail
    const product = await Product.findById(productId);
       console.log(product.productName)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Step 2: Flatten image array if needed
    const flatProductImage = Array.isArray(product.productImage)
      ? product.productImage.flat()
      : [];

    // Step 3: Check if wishlist already exists
    let wishList = await wishlistModel.findOne({ userId });
 

    if (!wishList) {
      // Step 4: Create new wishlist
      wishList = new wishlistModel({
        userId,
        items: [
          {
            productId,
            productName: product.productName,
            productImage: flatProductImage,
            quantity : product.quantity,
            productPrice: product.productPrice,
            total: product.productPrice * quantity
          }
        ],
        totalprince: product.productPrice * quantity
      });
    } else {
      // Step 5: Update existing wishlist
      const existingIndex = wishList.items.findIndex(
        item => item.productId === productId
      );

      if (existingIndex !== -1) {
        // Already in wishlist → update quantity and total
        wishList.items[existingIndex].quantity += quantity;
        wishList.items[existingIndex].total =
          wishList.items[existingIndex].quantity *
          wishList.items[existingIndex].productPrice;
      } else {
        // Not in wishlist → add new item
        wishList.items.push({
          productId,
          productName: product.productName,
          productImage: flatProductImage,
          quantity,
          productPrice: product.productPrice,
          total: product.productPrice * quantity
        });
      }

      // Recalculate total price
      wishList.totalprince = wishList.items.reduce((total, item) => {
        return total + item.total;
      }, 0);
    }

    // Save updated wishlist
    await wishList.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully.",
      addedProductName: product.productName,
      totalProductsInCart: wishList.items.length
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};
