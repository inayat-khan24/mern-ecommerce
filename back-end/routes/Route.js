import express from "express"
import {updateUserProfile, login, singUp,getUserDetails } from "../controller/userController.js"

import { getAllproduct, productAdd,productDelete} from "../controller/ProductController/ProductController.js"

import { addToCart, getcartproductbyid, removeFromCart, updateQuantity} from "../controller/cartController.js"
import { createCategory, getAllCategories } from "../controller/ProductController/category.js"
import { createSubCategory ,getAllSubCategories} from "../controller/ProductController/subcategoryController.js"
import { addToWishlist, getWishlist, removeWishlistItem } from "../controller/wishlistController.js"
import { productupload } from "../ProductController/upload.js"


export const router = express.Router()

router.post("/signup",singUp)

router.post("/login",login)


// add product Api
router.post("/product_add",productupload.array("productImage",5),productAdd)

//! {
// if we only upload single image without array thne use upload.single 
// router.post("/product_add",upload.single("productImage"),productAdd)
//! }

// fort getAll product
router.get("/product_getall",getAllproduct)

// product delete
router.post("/productdelete",productDelete)

//add cart API
router.post("/addtocart",addToCart)
// get cart APi
router.get("/getcartproductbyid",getcartproductbyid)

// delete cart 
router.delete("/removeFromCart",removeFromCart)

// update qunity
router.put("/updateQuantity",updateQuantity)

// add wishlist
router.post("/addToWishlist",addToWishlist)
// get wishlist 
router.get("/getWishlist",getWishlist)

// delete wishlist
router.delete("/removeWishlistItem",removeWishlistItem)

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