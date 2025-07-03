import { Cart } from "../model/cartModelSchema.js";


// 🛒 Add item to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
console.log(productId)
  try {
    let cart = await Cart.findOne({ userId });
// if userId and productID not given
if (!userId || !productId){
  return res.status(400).json({
    result: false,
    message:"userId and productId are required"})
}
      

    if (!cart) {
      // If no cart for user, create new one
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // If cart exists, check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Product exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product not in cart, push new item
        cart.items.push({ productId, quantity });
      }
    }
    

    await cart.save();
    res.status(200).json({ 
      result: true, 
      message: "Product added to cart successfully.",
      
       totalProductsInCart : cart.items.length});

  } catch (error) {
    res.status(400).json({ result: false, message: "Error adding to cart", error: error.message });
  }
};

// 🧾 Get cart for a user
export const getcartproductbyid = async (req, res) => {
   const { userId } = req.query;
console.log(userId)
  try {
    const cart = await Cart.findOne({ userId })
      // .populate("userId", "userName email")
      .populate("items.productId", "productName productPrice,productImage");

    if (!cart) {
      return res.status(404).json({ result: false, message: "Cart not found" });
    }

    res.status(200).json({
       success: true,
       message: "Cart fetched successfully",
       "cartItems":cart });
  } catch (error) {
    res.status(500).json({ result: false, message: "Error fetching cart", error: error.message });
  }
};

// 🗑️ Remove an item from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ result: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ result: true, message: "Item removed", cart });

  } catch (error) {
    res.status(500).json({ result: false, message: "Error removing item", error: error.message });
  }
};
