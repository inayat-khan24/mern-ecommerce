import Cart from "../model/cartModelSchema.js";
import Product from "../model/productSchema.js";

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "userId and productId are required"
    });
  }

  try {
    // Step 1: Get product detail
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Step 2: Make sure image array is flat
    const flatProductImage = Array.isArray(product.productImage)
      ? product.productImage.flat()
      : [];

    // Step 3: Check for existing cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Step 4: Create new cart
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            productName: product.productName,
            productImage: flatProductImage,
            quantity: quantity || 1,
            productPrice: product.productPrice,
            total: product.productPrice * (quantity || 1)
          }
        ],
        totalprince: product.productPrice * (quantity || 1)
      });
    } else {
      // Step 5: Update existing cart
      const existingIndex = cart.items.findIndex(
        item => item.productId === productId
      );

      if (existingIndex !== -1) {
        // Already in cart → update quantity
        cart.items[existingIndex].quantity += quantity || 1;

        // Update item total
        cart.items[existingIndex].total =
          cart.items[existingIndex].quantity * cart.items[existingIndex].productPrice;
      } else {
        // Not in cart → add new item
        cart.items.push({
          productId,
          productName: product.productName,
          productImage: flatProductImage,
          quantity: quantity || 1,
          productPrice: product.productPrice,
          total: product.productPrice * (quantity || 1)
        });
      }

      // Recalculate total price
      cart.totalprince = cart.items.reduce((total, item) => {
        return total + item.total;
      }, 0);
    }

    // Save cart
    await cart.save();

    // Response
    res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
        addedProductName : product.productName,
        totalProductsInCart : cart.items.length
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

export const getcartproductbyid = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required"
    });
  }

  try {
    // we get cart product 
    const cart = await Cart.findOne({ userId });


    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cartItems: [],
        totalPrice: 0
      });
    }

    // Optional: ensure all productImage fields are strings
    const updatedCartItems = cart.items.map(item => ({
     
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      productPrice: item.productPrice,
      quantity: item.quantity,
      total: item.total
    }));

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cartItems: updatedCartItems,
      totalprince : cart.totalprince
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};






