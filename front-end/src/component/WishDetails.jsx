import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button  from '@mui/material/Button';
import { useContext } from 'react';
import { ThemeContext } from '../store/create';

const WishDetails = (props) => {
const {_id,productDescription,productImage
    ,productName,productPrice,productQuantity,productRating,productStock} = props

    
const {selectedQty,DeleteWishItems} = useContext(ThemeContext)

  return (
    <div className='cartitem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)]
             pb-4'>
            <div className="img w-[10%] overflow-hidden h-[80px] rounded-md">
                <Link to="/product/45875" className='block group'>
                <img 
                src={`${productImage}`}
                 alt="" className='w-full group-hover:scale-105' />   
                 </Link>
            </div>
    <div className="info w-[75%] pr-5 relative"> 
            <h4 className='text-[14px] font-[500]'>
                <Link to="/product/5485" className='link transition-all'>
            {productName}
            </Link>
            </h4>
               <p className='flex items-center gap-5 mt-2 mb-2'>
                <span>Qty : <span>{productQuantity}</span>    </span>
                <span className='text-[#ff5252] font-bold'>₹{productPrice*productQuantity}</span>
                </p> 
            <MdOutlineDeleteOutline className='absolute top-[10px] right-[10px] 
                cursor-pointer text-[20px] link transition-all'
                 onClick={()=>DeleteWishItems(_id)}
                />

            </div>
                
               
        </div>
  )
}

export default WishDetails
