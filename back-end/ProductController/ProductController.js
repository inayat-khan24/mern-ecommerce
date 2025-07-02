import Product from "../../model/productSchema.js";

export const productAdd =  async(req,res)=>{
 try {
    console.log(req.file)
     const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productSubCategory,
      productStock,
      productQuantity
    } = req.body;

      const productImage = req.file ? `${req.file.filename}` : '';
   


    const newProduct = new Product({
       productName,
      productDescription,
      productPrice,
      productCategory,
      productSubCategory,
      productStock,
      productQuantity,
      productImage: productImage
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
     result: true,
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({ result: false, message: "Product add failed", error: error.message });
  }
}