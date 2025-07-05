// controllers/subCategoryController.js
import { categoryModel } from "../../model/categorySchema.js";
import { SubCategory } from "../../model/subcategorySchema.js";



export const createSubCategory = async (req, res) => {
  const { subCategoryName, categoryId, description } = req.body;

  if (!subCategoryName || !categoryId) {
    return res.status(400).json({ success: false, message: "subCategoryName and categoryId required" });
  }

  try {
    const category = await categoryModel .findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const subCategory = new SubCategory({
      subCategoryName,
      categoryId,
      description
    });

    await subCategory.save();

    res.status(201).json({ success: true, message: "Sub-category added successfully", data:subCategory });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getAllSubCategories = async (req, res) => {
  try {
    // Populate categoryId to get categoryName
    const subcategories = await SubCategory.find()
      .populate("categoryId", "categoryName")


    // Format output
    const data = subcategories.map(sub => ({
    
      _id: sub._id,

      subCategoryName: sub.subCategoryName,
      categoryId : sub.categoryId,
      description: sub.description,
 
      createdAt: sub.createdAt,
      updatedAt : sub.updatedAt
    }));

    console.log(subcategories)

    res.status(200).json({
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories",
      error: error.message
    });
  }
};
