import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../store/create";
import WishDetails from "../component/WishDetails";

const WishList = () => {
  const { wishListFetch, isLoading, wishlist } = useContext(ThemeContext);

  useEffect(() => {
    wishListFetch();
  }, []);

  const wishlistP = wishlist || [];
  
  const Totalprice = wishlistP.reduce(
    (acc, curr) => acc + curr?.productId?.productPrice,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex justify-center items-center text-blue-600 font-medium">
        Loading...
      </div>
    );
  }

  if (wishlistP.length === 0) {
    return (
      <div className="min-h-[200px] flex flex-col justify-center items-center text-center text-gray-500 font-medium p-6">
        <svg
          className="w-12 h-12 mb-2 text-blue-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18M9 9l3 3 3-3m0 6l-3-3-3 3"
          />
        </svg>
        <p>Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[[#e7e2e2]]  to-[#e0d7d7] min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-4 sm:p-6">
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-center text-blue-800 mb-4 border-b border-blue-200 pb-2">
          My Wishlist
        </h2>

        {/* Scrollable List */}
        <div className="scroll w-full max-h-[400px] overflow-y-auto overflow-x-hidden space-y-3 pr-2">
          {wishlistP.map((cartProduct, index) => {
            const product = cartProduct?.productId;
            if (!product) return null;
            const {
              _id,
              productDescription,
              productImage,
              productName,
              productPrice,
              productQuantity,
              productRating,
              productStock,
            } = product;

            return (
              <WishDetails
                key={_id}
                index={index}
                _id={_id}
                productDescription={productDescription}
                productImage={productImage}
                productName={productName}
                productPrice={productPrice}
                productQuantity={productQuantity}
                productRating={productRating}
                productStock={productStock}
                qty="1"
              />
            );
          })}
        </div>

        {/* Pricing Summary */}
        <div className="mt-4 border-t border-blue-100 pt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">Items Total</span>
            <span className="text-blue-600 font-bold">₹{Totalprice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Shipping</span>
            <span className="text-blue-600 font-bold">₹60</span>
          </div>
          <div className="flex items-center justify-between border-t pt-2 font-semibold text-blue-800">
            <span>Total (tax excl.)</span>
            <span className="text-blue-700 font-bold">₹{Totalprice + 60}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
