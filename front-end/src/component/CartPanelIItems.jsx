import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button  from '@mui/material/Button';
import { useContext } from 'react';
import { ThemeContext } from '../store/create';

const CartPanelIItems = (props) => {
const {_id,productImage
    ,productName,productPrice,total,
quantity} = props


const {DeleteItems} = useContext(ThemeContext)

  return (
    <div className='cartitem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)]
             pb-4'>
            <div className="img w-[10%] overflow-hidden h-[80px] rounded-md">
                <Link to="/product/45875" className='block group'>
                <img 
                src={`http://157.66.191.24:4447/uploads/${productImage}`}
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
                <span>Qty : <span>{quantity}</span>    </span>
                <span className='text-[#ff5252] font-bold'>₹{productPrice}</span>

                </p> 
            <MdOutlineDeleteOutline className='absolute top-[10px] right-[10px] 
                cursor-pointer text-[20px] link transition-all'
                 onClick={()=>DeleteItems(_id)}
                />

            </div>
                
               
        </div>
  )
}

export default CartPanelIItems
