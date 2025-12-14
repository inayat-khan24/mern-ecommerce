import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCloseSharp } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from "react-icons/go";
import { Rating } from '@mui/material';
import { ThemeContext } from '../store/create';

const CartItems = (props) => {
    const {_id,productDescription,
      productImage,productName,productPrice,productQuantity,
      productRating,productStock,index,
getSelected,quantity
    } = props
    
    const {
      setCartItems,cartItems,
      Total,allPrince,
      DeleteItems,product,
      QtyUpdate
      // selectedQty,setSelectedQty,
    } = useContext(ThemeContext)
   
     
    const [sizeanchorEl, setSizeAnchorEl] = useState(null)
    const [selectedSize,setSelectedSize] = useState(props.size)
    const [selectValue,setSelectValue] = useState(1)
    const openSize = Boolean(sizeanchorEl);

  
    const productPriceQty = productPrice * selectValue
    
    

    // for Qty
    const [qtyanchorEl, setQtyAnchorEl] = useState(null)
    



    const openQty = Boolean(qtyanchorEl);
  
  

    // For Qty function
    const handleClickQty = (event) => {
     
        setQtyAnchorEl(event.currentTarget);
      };
      const handleCloseQty = (value) => {
        
        setQtyAnchorEl(null);
        if(value  !==null){
         setSelectValue(value)
         QtyUpdate(_id,value)
        }

      
        
      };

    

  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
    <div className="img w-[15%] rounded-md overflow-hidden"> 
      <Link to="/product/78745" className='group'>
      <img
      src={`http://157.66.191.24:4447/uploads/${productImage}`}
      alt="" className='w-full group-hover:scale-105 transition-all'/>
      </Link>
    </div>

        <div className="info w-[85%] relative"> 
          <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all'
           onClick={()=>DeleteItems(_id)}
          />
          <span className='text-[13px]'>{productName} </span>
          <h3 className='text-[15px]'>
            <Link className='link'>{productDescription}</Link>
          </h3>

          <Rating name="size-small" defaultValue={productRating} size="small" readOnly />
            <div className='flex items-center gap-4'>
              <div className='relative'>
           

                  </div>

                <div className='relative'>
                <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer'
                    onClick={handleClickQty}
                    >
                Qty: {quantity}<GoTriangleDown/> </span>
                <Menu
                      id="Size-menu"
                      anchorEl={qtyanchorEl}
                      open={openQty}
                      onClose={()=>handleCloseQty(null)}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                >
                      <MenuItem onClick={()=>handleCloseQty("1")}>1</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("2")}>2</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("3")}>3</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("4")}>4</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("5")}>5</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("6")}>6</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("7")}>7</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("8")}>8</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("9")}>9</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty("10")}>10</MenuItem>
                </Menu>
                </div>
                
            </div>
          
          <div className='flex items-center gap-4 mt-2'> 
               <span className='text-[#ff5252] font-bold'>₹{productPriceQty}</span>
        </div> 
        </div>

    </div>
  )
}

export default CartItems
