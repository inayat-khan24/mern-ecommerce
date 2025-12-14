import Cart from "../model/cartModelSchema.js";
import Product from "../model/productSchema.js";


// add cart data 
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

// get cart data 
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

// delete cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    if(!userId || !productId){
      res.status(404).json({
            message: "userId and productId are required"
      })
    }
    const cart = await Cart.findOne({ userId });
    console.log(cart)
    if (!cart) {
      return res.status(404).json({ success: false, message: "cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);

    // Recalculate total price
    cart.totalprince = cart.items.reduce((acc, item) => acc + item.total, 0);

    await cart.save();
    const updatedCartItems = cart.items.map(item => ({
     
      productId: item.productId,
      productName: item.productName,
      
      productPrice: item.productPrice,
      quantity: item.quantity,
       _id : item?. _id.toString()
      
    }));
    

    res.status(200).json({ result: true,
       message: "cart item removed successfully", 
           _id : cart?._id,
       userId : cart.userId,
       items : {updatedCartItems},
       totalprince : cart.totalprince
       });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// update updateQuantity
export const updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log({ userId, productId, quantity });

  try {
    //  Validate input
    if (!userId || !productId || typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({
        result: false,
        message: "userId, productId, and numeric quantity are required"
      });
    }

    //  Find cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ result: false, message: "Cart not found" });
    }

    // Find the item inside the cart
    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ result: false, message: "Product not found in cart" });
    }

    //  Update quantity and total
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].total = cart.items[itemIndex].productPrice * quantity;

    // Update total cart price
    cart.totalprince = cart.items.reduce((sum, item) => sum + item.total, 0);

    //  Save changes
    await cart.save();

    res.status(200).json({
      result: true,
      message: "Cart updated successfully",
      
      items: {
   productId : cart.items[itemIndex].productId,
   quantity : cart.items[itemIndex].quantity,
   productPrice : cart.items[itemIndex].productPrice,
   productName : cart.items[itemIndex].productName,
    _id : cart.items[itemIndex]?._id,
  },
    
totalPrice : cart.totalprince,
updatedAt : cart.updatedAt,
__v  : cart?.__v



    });

  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Internal server error",
      error: error.message
    });
  }
};








