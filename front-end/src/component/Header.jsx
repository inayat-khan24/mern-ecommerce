import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { Tooltip, IconButton, Badge, Menu, MenuItem, Button, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Search from './Search.jsx';
import { ThemeContext } from '../store/create.jsx';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#ff5252',
    color: 'white',
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { cartItems, setOpenCartPanel, wishlist, isLogin, setIsLogin, userEmail, userName } = useContext(ThemeContext);
  
  const cartLength = cartItems?.cartItems || [];
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogin(true);
  }, [setIsLogin]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    setAnchorEl(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-3 gap-4">

          {/* 1. Logo */}
          <div className="flex-shrink-0 w-1/3 sm:w-auto flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
            </Link>
          </div>

          {/* 2. Search (Hidden on small mobile, visible on tablet+) */}
          <div className="order-3 sm:order-2 w-full sm:w-[40%] md:w-[50%] mt-2 sm:mt-0">
             <Search />
          </div>

          {/* 3. User Actions */}
          <div className="order-2 sm:order-3 w-auto flex items-center justify-end gap-2 sm:gap-4">
            
            {/* Login / Profile */}
            {!isLogin ? (
              <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Link to="/login" className="hover:text-[#ff5252] transition-colors">Login</Link>
                <span className="text-gray-300">|</span>
                <Link to="/signup" className="hover:text-[#ff5252] transition-colors">Register</Link>
              </div>
            ) : (
              <>
                <Button 
                  onClick={(e) => setAnchorEl(e.currentTarget)} 
                  className="!text-black !capitalize !px-1"
                >
                  <div className="flex items-center gap-2">
                    <Avatar 
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" 
                      className="!w-9 !h-9 !border-2 !border-gray-200"
                    />
                    <div className="hidden md:flex flex-col items-start text-xs leading-tight">
                      <span className="font-bold text-gray-800">{userName || "User"}</span>
                      <span className="text-gray-500 font-normal">{userEmail?.slice(0, 15)}...</span>
                    </div>
                  </div>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    elevation: 3,
                    sx: { mt: 1.5, minWidth: 200, borderRadius: '12px', overflow: 'hidden' },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Link to="/my-account"><MenuItem onClick={() => setAnchorEl(null)} className="gap-3 text-sm"><FaRegUser/> My Account</MenuItem></Link>
                  <Link to="/orders"><MenuItem onClick={() => setAnchorEl(null)} className="gap-3 text-sm"><IoBagCheckOutline/> Orders</MenuItem></Link>
                  <Link to="/wishlist"><MenuItem onClick={() => setAnchorEl(null)} className="gap-3 text-sm"><IoMdHeartEmpty/> My List</MenuItem></Link>
                  <div className="border-t my-1"></div>
                  <MenuItem onClick={handleLogout} className="gap-3 text-sm text-red-500"><IoIosLogOut/> Log Out</MenuItem>
                </Menu>
              </>
            )}

            {/* Icons */}
            <div className="flex items-center gap-1">
              <Link to="/wishlist">
                <Tooltip title="Wishlist">
                  <IconButton className="!text-gray-700 hover:!text-[#ff5252]">
                    <StyledBadge badgeContent={wishlist?.length || 0} color="secondary">
                      <FaRegHeart className="text-xl" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </Link>

              <Tooltip title="Cart">
                <IconButton onClick={() => setOpenCartPanel(true)} className="!text-gray-700 hover:!text-[#ff5252]">
                  <StyledBadge badgeContent={cartLength?.length || 0} color="secondary">
                    <MdOutlineShoppingCart className="text-2xl" />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;