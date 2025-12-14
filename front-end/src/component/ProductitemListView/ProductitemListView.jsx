import React, { useContext, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import  Button  from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineShoppingCart } from "react-icons/md";
import { ThemeContext } from '../../store/create';
// import { MyContext } from '../../App';

const ProductitemListView = (props) => {
 const {productDescription,productName,
productRating,productPrice,productImage,
setOpenProductDetailsModel,
productID
} = props
const {addCart,catFilter,setCatfilter} = useContext(ThemeContext)

  return (
   <div className='productItem shadow-md bg-[#f1f1f1] p-4 rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex items-center'>
      <div className="group imgWrapper w-[25%] h-[220px] overflow-hidden  rounded-md relative">
        <Link to="/">
            <div className="img  overflow-hidden">
            <img 
           src={`${productImage}`}
            className='w-full '
            alt="" />
            
             <img 
            src={`${productImage}`}
            className='w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105' 
            alt="" />
            </div>
        </Link>
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary
        text-white rounded-lg p-1 text-[12px] font-[500]">10%</span>
          
          
          <div className="actions absolute top-[-20px] right-[5px] z-50 flex items-center gap-2
          flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 
          group-hover:opacity-100">

            <Tooltip title="View Product Details" placement="left-start">

            <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full
             !text-black !bg-white hover:!bg-primary hover:!text-white group'
             onClick={()=>setOpenProductDetailsModel(true)}
             >
              <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white
              hover:!text-white'/>
              </Button>
              </Tooltip>
              

              <Tooltip title="Compare Items" placement="left-start">
              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full
             !text-black !bg-white hover:!bg-primary hover:!text-white group'>
              <IoGitCompareOutline className='text-[18px] !text-black group-hover:text-white
              hover:!text-white'/>
              </Button>
              </Tooltip>


              <Tooltip title="Wish List" placement="left-start"> 
              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full
             !text-black !bg-white hover:!bg-primary hover:!text-white group'>
              <FaRegHeart className='text-[18px] !text-black group-hover:text-white
              hover:!text-white'/>
              </Button>
              </Tooltip>
            

          </div>

      </div>
         <div className='info p-3 py-5 px-8 w-[75%] '>
            <h6 className='text-[15px] !font-[400] '><Link to='/' className='link transition-all'> Sangria</Link> </h6>
                <h3 className='text-[18px] title mt-3 mb-3 font-[500] text-[#000]'>
                    <Link to='/' className='link transition-all'>{productName} </Link>
                </h3>

                <h6 className='text-[13px] !font-[400]'><Link to='/' className='link transition-all'> {productDescription}</Link> </h6>

                 <Rating name="size-small" defaultValue={productRating} size="small" readOnly />
                   <div className='w-full flex items-center gap-4'> 
                    <span className='prince text-[#ff5252] text-[15px] font-[600]'>₹ {productPrice}</span>

                    </div> 

                  <Button className='btn-org !pt-4 !bg-red-600 hover:!bg-red-500 !text-white max-lg:w-[100%]  w-[40%] flex gap-2 '
            onClick={()=>addCart(productID)}
            >
                        <MdOutlineShoppingCart className='text-[22px]'/>Add to Cart</Button>  
         </div>    
    </div>
        
        

  )
}

export default ProductitemListView
