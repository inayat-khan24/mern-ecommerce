import express from "express"
import { login, singUp } from "../controller/userController.js"

import { getAllproduct, productAdd } from "../controller/ProductController/ProductController.js"
import upload from "../controller/ProductController/upload.js"


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