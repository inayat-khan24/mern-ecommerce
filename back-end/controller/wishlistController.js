import Product from "../model/productSchema.js";
import { wishlistModel } from "../model/wishlistModelSchema.js";




//  Add product to wishlist
export const addToWishlist = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  console.log(productId)
  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "userId and productId are required" });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

   

    let wishList = await wishlistModel.findOne({ userId });

    if (!wishList) {
      wishList = new wishlistModel({
        userId: userId,
        items: [
          {
            productId ,
            productName: product.productName,
            productDescription:  product.productDescription,
            productImage: product.productImage,
            productRating : product.productRating,
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
           productDescription:  product.productDescription,
             productRating : product.productRating,
          
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

// Get wishlist by userId
export const getWishlist = async (req, res) => {
const { userId } = req.query;

try {
  if(!userId){
    res.status(404).json({
        "message": "userId Query Params is required"
    })
  }
    const wishList = await wishlistModel.findOne({ userId });
  
    if (!wishList) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

        const updatedwishListtems = wishList.items.map(item => ({
       _id :  wishList?._id.toString(),
       userId : wishList.userId.toString(),
       productId : {
       _id : item.productId,
       productName: item.productName,
       productDescription : item.productDescription,
      productImage: item.productImage,
      productPrice: item.productPrice,
      productRating : item.productRating,
      productQuantity: item.quantity,
      total: item.total
       },
       createdAt : wishList.createdAt,
       updatedAt : wishList.updatedAt
    
    }));
    res.status(200).json({ 
    message: "Wishlist fetched successfully",
      data : updatedwishListtems
     });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// Remove a product from wishlist
export const removeWishlistItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    if(!userId || !productId){
      res.status(404).json({
            message: "userId and productId are required"
      })
    }
    const wishList = await wishlistModel.findOne({ userId });
    if (!wishList) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    wishList.items = wishList.items.filter(item => item.productId !== productId);

    // Recalculate total price
    wishList.totalprince = wishList.items.reduce((acc, item) => acc + item.total, 0);

    await wishList.save();

    res.status(200).json({ result: true,
       message: "Wishlist item removed successfully", 
       wishlist: wishList });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};



