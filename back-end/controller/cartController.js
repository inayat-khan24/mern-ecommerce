
import cartModelSchema from "../model/cartModelSchema.js";
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





// add to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  //step 1 for cheching userId and productId given or not 
  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "userId and productId are required" });
  }

  try {
  //Step 2: Check if Item Already in Cart
    const cart = await cartModelSchema.findOne({ userId });

      // Step 3: If cart exists
    if (cart) {
      // Check if product already in cart
      const existingItem = cart.cartItems.find(
        item => item.productId.toString() === productId
      );

      if (existingItem) {
        // If product exists, update quantity
        existingItem.quantity += quantity || 1;
      } else {
        // If product doesn't exist, push new item
        cart.cartItems.push({
          productId,
          quantity: quantity || 1
        });
      }

      await cart.save();
    } else {
      // Step 4: If no cart exists, create new
      cart = new Cart({
        userId,
        cartItems: [{
          productId,
          quantity: quantity || 1
        }]
      });

      await cart.save();
    }


    const newCart = new cartModelSchema({
      userId,
      cartItems : [productId] ,
      
      quantity: quantity || 1
    });

    await newCart.save();

    res.status(201).json({ 
     result: "true",
    message: "Product added to cart successfully.",
      cart
     });

  }catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};


export const getcartproductbyid = async(req,res)=>{
const {userId} = req.query
// Step 1: Validate userId
if (!userId){
res.status(404).json({
  result : false ,
  message : "userId is required in query"
})

}


}