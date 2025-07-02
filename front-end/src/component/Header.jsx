import React, { useContext, useEffect, useState } from 'react'
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  const { cartItems, setOpenCartPanel, wishlist, isLogin, setIsLogin, userEmail, userName } = useContext(ThemeContext);
  const cartLength = cartItems?.cartItems || [];
  const token = localStorage.getItem('token')
 
  useEffect(()=>{
    setIsLogin(token)

  },[])

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLogin(false);
  };

  return (
    <header 
    className=" bg-amber-50 w-[100%] max-lg:flex-col   flex max-sm:flex-col  justify-around items-center border-b border-gray-200 shadow-sm"
    >
    

        {/* Logo */}
        <div className="flex  items-center   max-sm:w-full justify-center pl-2 w-[30%] sm:w-auto">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Search */}
        <div className=" w-[40%]  py-4 flex justify-center  max-sm:w-full max-sm:px-4  sm:justify-start">
          <Search />
        </div>

        {/* User Actions */}
        <ul className="flex max-lg:justify-center gap-3 max-sm:pl-4 max-lg:w-full  max-sm:w-full items-center w-[30%]">

          {!isLogin ? (
            <li className="flex gap-1 text-sm font-medium">
              <Link to="/login" className="hover:text-amber-500">Login</Link>
              <span>|</span>
              <Link to="/signup" className="hover:text-amber-500">Register</Link>
            </li>
          ) : 
          (
            <>
    <Button className="flex items-center max-sm:w-full gap-2" onClick={handleClick}>
  <div className="!bg-[#f1f1f1] !rounded-full !h-10 !w-10 !min-w-10 flex items-center justify-center p-0">
    <img
                  src={
"https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
                  }
                  alt="user profile"
                  className='w-full h-full object-cover rounded-full'
                />
  </div>
  <div className=" sm:flex flex-col items-start text-xs">
    <span className="font-semibold capitalize text-black/70">{userName}</span>
    <span className="text-black/50">{userEmail}</span>
  </div>
</Button>


              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: { mt: 1.5, minWidth: 180 },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link to="/my-account">
                  <MenuItem onClick={handleClose}><FaRegUser className="mr-2" /> My Account</MenuItem>
                </Link>
                <Link to="/cart">
                  <MenuItem onClick={handleClose}><IoBagCheckOutline className="mr-2" /> Orders</MenuItem>
                </Link>
                <Link to="/wishlist">
                  <MenuItem onClick={handleClose}><IoMdHeartEmpty className="mr-2" /> My List</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}><IoIosLogOut className="mr-2" /> Log Out</MenuItem>
              </Menu>
            </>
          )}

          {/* Wishlist */}
          <li>
            <Link to="/wishlist">
              <Tooltip title="Wishlist">
                <IconButton>
                  <StyledBadge badgeContent={wishlist ===undefined? 0 : wishlist.length } color="secondary">
                    <FaRegHeart />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            </Link>
          </li>

          {/* Cart */}
          <li>
            <Tooltip title="Cart">
              <IconButton onClick={() => setOpenCartPanel(true)}>
                <StyledBadge badgeContent={cartLength ===undefined? 0 : cartLength.length } color="secondary">
                  <MdOutlineShoppingCart />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </li>
        </ul>
   
    </header>
  );
};

export default Header;
