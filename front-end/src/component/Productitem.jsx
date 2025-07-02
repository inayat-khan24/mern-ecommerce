import React, { useContext, useEffect } from 'react'

import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import  Button  from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { ThemeContext } from '../store/create';





const Productitem = (props) => {
   
    const  {productImage,productDescription,productName,
productRating,productPrice, index,productID,
setOpenProductDetailsModel
} = props
 const [sliceLength, setSliceLength] = useState(40);
 useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSliceLength(width <= 799 ? 20 : 40);
      setSliceLength(width <= 440 ? 10 : 40);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

const context = useContext(ThemeContext)




  return (
   <div className='productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]'>
      <div className="group imgWrapper w-[100%] h-[220px] max-lg:h-[auto] overflow-hidden  rounded-md relative">
        <Link to="/">
            <div className="img  overflow-hidden">
            <img 
            src={`http://157.66.191.24:4447/uploads/${productImage}`}
            className='w-full object-contain
            mt-5
            h-48
            transition duration-1000 ease-in-out
            '
            alt="" />
            
             <img 
              src={`http://157.66.191.24:4447/uploads/${productImage}`}
            className='w-full object-cover
             
             transition-all duration-900 absolute top-0 left-0 opacity-0 
             group-hover:opacity-100 group-hover:scale-100' 
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
              onClick={()=>{
                context.setOpenProductDetailsModel(true)
                context.setProductIndex(index)
                
              }}
             >

              <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white
              hover:!text-white'/>
              </Button>
              </Tooltip>
              

              <Tooltip title="Compare Items" placement="left-start">
              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full
             !text-black !bg-white hover:!bg-primary hover:!text-white group'
              
             >
              <IoGitCompareOutline className='text-[18px] !text-black group-hover:text-white
              hover:!text-white'/>
              </Button>
              </Tooltip>

{/* <Link to="/wishlist"> */}
              <Tooltip title="Wish List" placement="left-start"> 
                
              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full
             !text-black !bg-white hover:!bg-primary hover:!text-white group'
             onClick={()=>{context.setOpenProductDetailsModel(true)
                context.setProductIndex(index)}}
             >
              <FaRegHeart className='text-[18px] !text-black group-hover:text-white
              hover:!text-white'/>
              </Button>
              </Tooltip>
      {/* </Link>       */}

          </div>

      </div>
         <div className='info p-3 py-5 '>
            <h6 className='text-[13px] !font-[400]'><Link to='/' className='link transition-all'> {productDescription.slice(0,sliceLength)}... </Link> </h6>
                <h3 className='text-[13 px] title mt-1 mb-2 font-[500] text-[#000]'>
                    <Link to='/' className='link transition-all'>{productName}</Link>
                </h3>
                <Rating name="size-small" defaultValue={productRating} size="small" readOnly />
                   <div className='w-full flex items-center gap-4'> 
                    <span className='prince text-[#ff5252] text-[15px] font-[600]'>₹ {productPrice}</span>

                    </div> 

         </div>    
    </div>
        
        

  )
}

export default Productitem
