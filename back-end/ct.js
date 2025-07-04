import Cart from "../model/cartModelSchema.js";
import Product from "../model/productSchema.js";



// export const addToCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;



//   if (!userId || !productId) {
//     return res.status(400).json({ success: false, message: "userId and productId are required" });
//   }

//   try {
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found" });

//     const productTotal = product.productPrice * (quantity || 1);

//     let cart = await cartModelSchema.findOne({ userId });

//     if (!cart) {
//       cart = new cartModelSchema({
//         userId,
//         cartItems: [{
//           productId,
//           productName: product.productName,
//           productImage: product.productImage,
//           productPrice: product.productPrice,
//           quantity: quantity || 1,
//           total: productTotal
//         }],
//         totalPrice: productTotal
//       });
//     } else {
//       const itemIndex = cart.cartItems.findIndex(item => item.productId.toString() === productId);

//       if (itemIndex > -1) {
//         // Update quantity and total
//         cart.cartItems[itemIndex].quantity += quantity || 1;
//         cart.cartItems[itemIndex].total = cart.cartItems[itemIndex].quantity * product.productPrice;
//       } else {
//         // Add new item
//         cart.cartItems.push({
//           productId,
//           productName: product.productName,
//           productImage: product.productImage,
//           productPrice: product.productPrice,
//           quantity: quantity || 1,
//           total: productTotal
//         });
//       }

//       // Update total cart price
//       cart.totalPrice = cart.cartItems.reduce((sum, item) => sum + item.total, 0);
//     }

//     await cart.save();

//     res.status(200).json({ success: true, message: "Product added to cart", cart });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Internal server error" , error:err.message});
//   }
// };

// export const getcartproductbyid = async (req, res) => {
//   const { userId } = req.query;

//   if (!userId) {
//     return res.status(400).json({
//       success: false,
//       message: "userId is required"
//     });
//   }

//   try {
//     // we get cart product 
//     const cart = await cartModelSchema.findOne({ userId });


//     if (!cart || cart.cartItems.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "Cart is empty",
//         cartItems: [],
//         totalPrice: 0
//       });
//     }

//     // Optional: ensure all productImage fields are strings
//     const updatedCartItems = cart.cartItems.map(item => ({
     
//       productId: item.productId,
//       productName: item.productName,
//       productImage: item.productImage,
//       productPrice: item.productPrice,
//       quantity: item.quantity,
//       total: item.total
//     }));

//     res.status(200).json({
//       success: true,
//       message: "Cart fetched successfully",
//       cartItems: updatedCartItems,
//       totalPrice: cart.totalPrice
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: err.message
//     });
//   }
// };









// to fetch product details

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

    // Ensure productImage is a flat array of strings
    const flatProductImage = Array.isArray(product.productImage)
      ? product.productImage.flat()
      : [];

    // Step 2: Check if user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Step 3: No cart — create new one
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            productName: product.productName,
            productImage: flatProductImage,
            quantity: quantity || 1,
            productPrice: product.productPrice,
             
          }
        ],
        totalprince: product.productPrice * (quantity || 1)
      });
    } else {
      // Step 4: Check if product already exists in cart
      const existingIndex = cart.items.findIndex(
        item => item.productId === productId
      );

      if (existingIndex !== -1) {
        // Product already in cart → increase quantity
        cart.items[existingIndex].quantity += quantity || 1;
      } else {
        // Add new product to cart (image was missing here!)
        cart.items.push({
          productId,
          productName: product.productName,
          productImage: flatProductImage, // ✅ Add image here too
          quantity: quantity || 1,
          productPrice: product.productPrice
        });
      }

      // Step 5: Update total price
      cart.totalprince = cart.items.reduce((total, item) => {
        return total + item.quantity * item.productPrice;
      }, 0);
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
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
console.log(cart)
    // Optional: ensure all productImage fields are strings
    const updatedCartItems = cart.items.map(item => ({
     
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      productPrice: item.productPrice,
      quantity: item.quantity,
      total: item.totalprince
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






