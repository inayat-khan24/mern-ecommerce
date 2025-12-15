import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button  from '@mui/material/Button';
import CartPanelIItems from './CartPanelIItems';
import { useContext } from 'react';
import { ThemeContext } from '../store/create';

const CartPanel = () => {
    const {cartItems,DeleteItems,Total,allPrince} = useContext(ThemeContext)

    
    
    const cartList =  cartItems.cartItems || []
   const {totalprince} = cartItems
    if(cartList.length){
   <div>Emty Items </div>
    }
    
  return (
    <div className='flex flex-col'>
    {
     cartList.length === 0 ? <div>Empty Items</div> :
     <div className='scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4 ' >
        {/* card item  */}
       {



                cartList.map((cartProduct,index)=>{
                    
                    const {productId,productDescription,productImage,productName,productPrice,quantity,productRating,productStock} = cartProduct
                    return  <CartPanelIItems  key={index}
                    index={index}
                                _id={productId} productDescription={productDescription}
                                productImage={productImage} productName = {productName}
                                productPrice={productPrice} quantity={quantity}
                                productRating={productRating} productStock={productStock}
                                DeleteItems={DeleteItems}

                                />
                    

                })
              }
    </div>
    }
<br />
  

<div className='flex flex-col'>
      <div className='flex items-center justify-between w-full'>
                <span className='text-[14px] font-[600]'>{`${cartList.length} iteam`}</span> 
                <span className='text-[#ff5252] font-bold'>₹{totalprince}</span>   
            </div>
     <div className='flex items-center justify-between w-full'>
                <span className='text-[14px] font-[600]'>Shipping</span> 
                <span className='text-[#ff5252] font-bold'>₹60</span>   
            </div>

              <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)]
        flex items-center justify-between flex-col">
            <div className='flex items-center justify-between w-full'>
                <span className='text-[14px] font-[600]'>Total (tax excl.)</span> 
                <span className='text-[#ff5252] font-bold'>{totalprince+60}</span>   
            </div>
            <br />
        <div className='flex items-center justify-between w-full gap-5'>
            <Link to="/cart" className='w-[50%] d-block'>
                <Button className='!bg-[#2790b9] !text-white w-full'>view Cart</Button>
            </Link>

                <Link to="/checkout" className='w-[50%] d-block'>
                <Button className='!bg-[#2790b9] !text-white w-full ' onAuxClick={()=>ChecKOut()}>Checkout</Button>
            </Link>
        </div>
        

    </div>

            
</div>

 

</div>
      
  )
}

export default CartPanel
