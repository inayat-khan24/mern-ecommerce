import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "../component/CartItems";
import { ThemeContext } from "../store/create";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartListFetch, cartItems } = useContext(ThemeContext);
  const cartList = cartItems.cartItems || [];
  const { totalPrice } = cartItems;

  useEffect(() => {
    cartListFetch();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#e7e2e2] to-[#e0d7d7] py-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Left Products Section */}
        <div className="lg:w-2/3 w-full space-y-5">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-white-50 px-5 py-4 border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-800">Your Cart</h2>
              <p className="text-sm text-gray-600 mt-1">
                You have{" "}
                <span className="font-semibold text-blue-600">{cartList.length}</span>{" "}
                {cartList.length === 1 ? "item" : "items"} in your cart.
              </p>
            </div>
            <div className="divide-y divide-blue-50">
              {cartList.map((cartProduct, index) => {
                const {
                  productId,
                  productDescription,
                  productImage,
                  productName,
                  productPrice,
                  productQuantity,
                  productRating,
                  productStock,
                  quantity,
                  total,
                } = cartProduct;

                return (
                  <CartItems
                    key={index}
                    index={index}
                    _id={productId}
                    productDescription={productDescription}
                    productImage={productImage}
                    productName={productName}
                    productPrice={total}
                    productQuantity={productQuantity}
                    productRating={productRating}
                    productStock={productStock}
                    quantity={quantity}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary Section */}
        <div className="lg:w-1/3 w-full">
          <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-3">
              Cart Totals
            </h3>

            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Subtotal</span>
              <span className="text-blue-600 font-bold">₹{totalPrice}</span>
            </div>

            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Shipping</span>
              <span className="font-bold text-green-600">₹60</span>
            </div>

            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Estimate for</span>
              <span className="font-bold">INDIA</span>
            </div>

            <hr className="my-2 border-blue-100" />

            <div className="flex items-center justify-between text-base font-bold text-blue-800">
              <span>Total</span>
              <span className="text-blue-600 text-lg">₹{totalPrice + 60}</span>
            </div>

            <Link to="/checkout" className="w-full block mt-4">
              <Button className="!bg-blue-600 !text-white w-full flex gap-2 py-3 hover:!bg-blue-700 transition-all rounded-lg shadow-md">
                <BsFillBagCheckFill className="text-xl" />
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
