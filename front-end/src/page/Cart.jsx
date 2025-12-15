import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { BsFillBagCheckFill, BsArrowLeft } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import CartItems from "../component/CartItems";
import { ThemeContext } from "../store/create";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

const CartPage = () => {
  const { cartListFetch, cartItems } = useContext(ThemeContext);




  // Agar cartItems undefined hai toh empty array le lo
  const cartList = cartItems?.cartItems || [];
  
 
  const shippingCost = 60;
  const finalTotal = cartItems.totalprince + shippingCost;

  useEffect(() => {
    cartListFetch();
  }, []);

console.log( "caryItems",cartItems )
  console.log( "total",cartItems.totalprince)
  // --- Empty Cart View ---
  if (!cartList.length) {
    return (
      <div className="min-h-screen bg-[#f4f5f7] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoBagHandleOutline size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/">
            <Button 
              variant="contained" 
              className="!bg-blue-600 !text-white !capitalize !py-3 !px-8 !rounded-lg !font-semibold hover:!bg-blue-700"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // --- Main Cart View ---
  return (
    <section className="min-h-screen bg-[#f4f5f7] py-8">
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 lg:px-8 mb-6">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" className="text-gray-500 hover:text-blue-600 no-underline text-sm">
            Home
          </Link>
          <Typography color="text.primary" className="!text-sm !font-medium">Cart</Typography>
        </Breadcrumbs>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">Shopping Cart</h1>
      </div>

      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left: Products Section */}
        <div className="lg:w-[70%] w-full">
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <span className="font-semibold text-gray-700">Product Details</span>
              <span className="text-sm text-gray-500">
                <span className="font-bold text-blue-600">{cartList.length}</span> Items
              </span>
            </div>

            {/* List */}
            <div className="divide-y divide-gray-100">
              {cartList.map((cartProduct, index) => {
                return (
                  <CartItems
                    key={cartProduct.productId || index}
                    index={index}
                    _id={cartProduct.productId}
                    productDescription={cartProduct.productDescription}
                    productImage={cartProduct.productImage}
                    productName={cartProduct.productName}
                    productPrice={cartProduct.total} 
                    productQuantity={cartProduct.productQuantity}
                    productRating={cartProduct.productRating}
                    productStock={cartProduct.productStock}
                    quantity={cartProduct.quantity}
                  />
                );
              })}
            </div>
            
            {/* Continue Shopping Link */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm gap-2 transition-all">
                 <BsArrowLeft /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Summary Section (Sticky on Desktop) */}
        <div className="lg:w-[30%] w-full h-fit sticky top-24">
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-600">
                <span className="text-sm">Subtotal</span>
                {/* Safe .toLocaleString() call */}
                <span className="font-bold text-gray-800">₹{cartItems.totalprince}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span className="text-sm">Shipping estimate</span>
                <span className="font-bold text-green-600">+ ₹{shippingCost}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span className="text-sm">Tax estimate</span>
                <span className="font-bold text-gray-800">₹0</span>
              </div>
            </div>

            <hr className="my-4 border-dashed border-gray-200" />

            <div className="flex items-center justify-between mb-6">
              <span className="text-base font-bold text-gray-800">Order Total</span>
              {/* Safe .toLocaleString() call */}
              <span className="text-xl font-bold text-blue-600">₹{finalTotal}</span>
            </div>

            <Link to="/checkout" className="block">
              <Button 
                className="!bg-blue-600 !text-white w-full !py-3 !rounded-lg !capitalize !text-base !font-semibold hover:!bg-blue-700 shadow-md hover:shadow-lg transition-all"
                startIcon={<BsFillBagCheckFill className="text-sm" />}
              >
                Proceed to Checkout
              </Button>
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <IoBagHandleOutline />
              <span>Secure Checkout Guaranteed</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CartPage;