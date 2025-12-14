import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ThemeContext } from '../store/create'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FaRegHeart } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'

const ProductDetailsComponent = () => {
 
  const [qty, setQty] = useState(0);
  const {addCart,addWishList,product} = useContext(ThemeContext)
  
  

   


  return (
    <>
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4">
      {/* Left Section: Product Image */}
      <section className="part1 w-full md:w-1/3 flex justify-center">
        <img
          className="rounded-lg object-cover max-w-full h-auto shadow-md"
         src={`${product.productImage}`}
          alt="Cycle"
        />
      </section>

      {/* Right Section: Product Info */}
      <section className="part2 w-full md:w-2/3 space-y-2">
        <p className="text-gray-600">{product ?product.productDescription : "Loading..." }</p>
        <h1 className="text-2xl font-semibold">{product ? product.productName : "Loading..." }</h1>
      <div className="flex items-center gap-4 mt-2">
  {/* Price */}
  <p className="text-[#ff5252] text-xl font-semibold">
    ₹{product ? product.productPrice : "Loading..."}
  </p>

  {/* Stock Status */}
  {product ? (
    product.productStock > 0 ? (
      <span className="text-green-500 font-medium">In Stock ({product.productStock})</span>
    ) : (
      <span className="text-red-500 font-medium">Out of Stock</span>
    )
  ) : (
   
    <span className="text-gray-400">Loading...</span>
  )}
</div>

<Rating name="size-small" defaultValue={product ?product.productDescription : "Loading..." } size="small" readOnly />
        
          <div className='w-[100%] flex gap-2 '>
<input
  type="number"
  min={0}
  value={qty}
  className="w-[20%] h-[40px] p-2 pl-5 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.2)] rounded-md"
  onChange={(e) => {
    const value = Number(e.target.value);
    setQty(value < 0 ? 0 : value);
  }}/>
            <Button className='btn-org !bg-[red] !text-white  w-[40%] flex gap-2 '
            onClick={()=>addCart(product)}
            >
                        <MdOutlineShoppingCart className='text-[22px]'/>Add to Cart</Button>

          </div>
           <span className='flex  items-center gap-2 mt-5 text-[15px] link cursor-pointer font-[500]'
            onClick={()=>addWishList(product)}
           >
               <FaRegHeart className='text-[18px]'/> Add to Wishlist</span>
      </section>
    </div>

    <ToastContainer/>
    </>
  )
}

export default ProductDetailsComponent
