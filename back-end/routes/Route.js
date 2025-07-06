import express from "express"
import {updateUserProfile, login, singUp,getUserDetails } from "../controller/userController.js"

import { getAllproduct, productAdd,productDelete} from "../controller/ProductController/ProductController.js"
import upload from "../controller/ProductController/upload.js"
import { addToCart, getcartproductbyid} from "../controller/cartController.js"
import { createCategory, getAllCategories } from "../controller/ProductController/category.js"
import { createSubCategory ,getAllSubCategories} from "../controller/ProductController/subcategoryController.js"


export const router = express.Router()

router.post("/signup",singUp)

router.post("/login",login)

router.post("/product_add",upload.array("productImage",5),productAdd)

//! {
// if we only upload single image without array thne use upload.single 
// router.post("/product_add",upload.single("productImage"),productAdd)
//! }

// fort get product
router.get("/product_getall",getAllproduct)

// product delete
router.post("/productdelete",productDelete)

//add cart API
router.post("/addtocart",addToCart)
// get cart APi
router.get("/getcartproductbyid",getcartproductbyid)

// add category API
router.post("/addcategory",createCategory)

// get all categories
router.get("/getAllCategories",getAllCategories)

// add subcategories
router.post("/addsubcategory",createSubCategory)

// getsubcategory
router.get("/getAllSubCategories",getAllSubCategories)

// get userDetails
router.get("/getUserDetails",getUserDetails)
// update user
router.put("/updateUserProfile",updateUserProfile)