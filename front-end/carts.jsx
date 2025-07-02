import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoBagCheckOutline, IoGitCompareOutline } from "react-icons/io5";
import Tooltip from '@mui/material/Tooltip'; 
import IconButton from '@mui/material/IconButton';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import Search from './Search.jsx'
import { ThemeContext } from '../store/create.jsx';
import Button from '@mui/material/Button'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Navigation from './Navigation/index.jsx';



const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

 const handleLogout =()=>{
   localStorage.removeItem("email")
   localStorage.removeItem("token")
   localStorage.removeItem("userName")
   
   }


const Header = () => {

  // use id
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };

   
  const {cartItems,setOpenCartPanel,wishlist,isLogin,setIsLogin,
    userEmail,userName,token
  } = useContext(ThemeContext)

const cartLength = cartItems?.cartItems || []

   const handleLogout =()=>{
   localStorage.removeItem("email")
   localStorage.removeItem("token")
   localStorage.removeItem("userName")
   setIsLogin(false)}
  
  return (
 <>
 <header className='bg-amber-50'>
<div className="header py-4 border-b-[1px] border-gray-250 ">
<div className="container flex items-center justify-between max-sm:flex-col  gap-3">
<div className="col1 w-[25%]">
<Link to={"/"}> <img src="/logo.png" alt="Logo" />  </Link>
</div>
<div className="col2 w-[45%] max-sm:w-[80%]">
<Search/>
</div>



<div className="col3 Hlogin w-[30%] flex items-center pl-7 max-sm:w-[60%] ">
<ul className="flex items-center justify-end gap-3 w-full">


  {
      isLogin === false ? (
      <li className="list-none"> 
      <Link to="/login" className='link transition text-[15px] font-[500]'>Login </Link>{ " "} | &nbsp; 
      <Link to="/singup" className='link transition text-[15px] font-[500]'>Register </Link>
      </li>)
      :
      <>
      <Button className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
       onClick={handleClick}
      >
        <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]'>
          <FaRegUser  className='text-[16px] text-[rgba(0,0,0,0.7)]'/>
          </Button>

          <div className="info flex flex-col">
            <h4 className='leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[600] mb-0 capitalize text-left justify-start'>{userName}</h4>
            <span className='text-[13px] text-[rgba(0,0,0,0.6)] font-[400] capitalize text-left justify-start'>{userEmail}</span>

          </div>

      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/my-account" className='w-full block'>
        <MenuItem onClick={handleClose} className='flex gap-2 !py-3'>
          <FaRegUser className='text-[18px]'/>
          <span className='text-[14px]'>
          My Account
          </span>
        </MenuItem>
        </Link>
         <Link to="/cart">
        <MenuItem onClick={handleClose}  className='flex gap-2  !py-3'>
        <IoBagCheckOutline className='text-[18px]'/>
        <span className='text-[14px]'>
           Orders
        </span>
        </MenuItem>
        </Link>
        <Link to="/wishlist">
        <MenuItem onClick={handleClose}  className='flex gap-2  !py-3'> 
        <IoMdHeartEmpty className='text-[18px]'/>
        <span className='text-[14px]'>
           My List
           </span>
        </MenuItem>
           </Link>

        <MenuItem onClick={handleClose}  className='flex gap-2  !py-3'>
        <span className='flex gap-2' onClick={handleLogout} >
          <IoIosLogOut className='text-[18px]' />
        <span className='text-[14px]'>
           Log Out
           </span>
        </span>
        </MenuItem>
        
      </Menu>
      </>

  }


  <li>
    <Link to="/wishlist">
  <Tooltip title="Wishlist">

     <IconButton aria-label="cart" >
      <StyledBadge badgeContent={wishlist.length} color="secondary">
      <FaRegHeart />

       </StyledBadge>
      </IconButton>
      </Tooltip>
      </Link>
 </li>

 <li>
  {/* <Link to="/cart"> */}
 <Tooltip title="Cart">
     <IconButton aria-label="cart" 
     onClick={()=>setOpenCartPanel(true)}
     >
      <StyledBadge badgeContent={cartLength.length} color="secondary">
      <MdOutlineShoppingCart />

       </StyledBadge>
      </IconButton>
      </Tooltip>
      {/* </Link> */}
 </li>


</ul>

</div>

</div>


</div>

</header>



 
 </>

 

  )
}

export default Header
