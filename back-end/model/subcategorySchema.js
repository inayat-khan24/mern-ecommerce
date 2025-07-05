// models/subCategoryModel.js
import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subCategoryName: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",  // ✅ Reference to Category
    required: true
  },
  description: { type: String }
}, {
  timestamps: true
});

export const SubCategory = mongoose.model("subCategory", subCategorySchema);
