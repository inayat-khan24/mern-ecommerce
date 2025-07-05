import { categoryModel } from "../../model/categorySchema.js"

// creat and add all cetegory
export const createCategory = async (req, res) => {
  const { categoryName, description } = req.body;

  if (!categoryName || !description) {
    return res.status(400).json({ success: false, message: "categoryName and description required" });
  }

  try {
    const existing = await categoryModel.findOne({ categoryName });

    if (existing) {
      return res.status(409).json({ success: false, message: "Category already exists" });
    }

    const category = new categoryModel({ categoryName, description });
    await category.save();

    res.status(201).json({ success: true, message: "Category created", category });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// get all cetegories 
export const getAllCategories = async(req,res)=>{
try {
  const data = await categoryModel .find()

  res.status(200).json({
    result : true,
    data
  })

} catch (error) {
  res.status(404).json({
    result: false,
    error : error.message
  })
}
  

}