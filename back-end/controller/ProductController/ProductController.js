import Product from "../../model/productSchema.js";


// add product 
export const productAdd =  async(req,res)=>{
 try {
    console.log(req.file)
     const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productRating,
      productSubCategory,
      productStock,
      productQuantity} = req.body;



    // { if we want only uplload single image
    //  const productImage = req.file ? `${req.file.filename}` : '';
    //  }

       const productImages = req.files.map(file => file.filename) || [];
   


    const newProduct = new Product({
       productName,
      productDescription,
      productPrice,
      productRating,
      productCategory,
      productSubCategory,
      productStock,
      productQuantity,
      productImage: productImages
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
     result: true,
     message: "Products fetched successfully",
      data : [savedProduct]
    });
  } catch (error) {
   return res.status(400).json({ result: false, message: "Product add failed", error: error.message });
  }
}

// get all product
export const getAllproduct = async (req, res) => {
  try {
    const getproduct = await Product.find(); // Consider using a plural name for clarity
    return res.status(200).json({
      result: true,
      message: "Products fetched successfully",
      getproduct,
    });
  } catch (error) {
    return res.status(400).json({
      result: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};


// product deleted
export const productDelete = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      result: false,
      message: "productId is required",
    });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        result: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      result: true,
      message: "Product deleted successfully",
      deletedProduct,
    });

  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

