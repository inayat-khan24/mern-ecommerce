import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/Header.jsx'
// import ProductZoom from './component/ProductZoom.jsx'

import Login from './page/Login.jsx'
import SingUp from './page/SingUp.jsx'
import Home from './page/Home.jsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ThemeContext } from './store/create.jsx'
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
import ProductDetailsComponent from './component/ProductDetailsComponent.jsx'
import Footer from './component/Footer.jsx'

import CartPage from './page/Cart.jsx'
import CartPanel from './component/CartPanel.jsx'
import Panel from './panel.jsx'
import ChecKOut from './page/CheckOut.jsx'
import WishList from './page/WishList.jsx'
import ProductListing from './page/ProductListing.jsx'
import Verify from './page/Verify.jsx'
import ForgotPassword from './page/ForgotPassword .jsx'
import NotFound from './page/NotFound.jsx'
import MyAccount from './page/Account.jsx'





const App = () => {
  const {
    openProductDetailsModel,
    fullWidth,setFullWidth,
        maxWidth,setMaxWidth,
        handleCloseProductDetailsModel,
        openCartPanel,handleCloseCartpanel

   } = useContext(ThemeContext)
  return (
    <>
   <BrowserRouter>
   <Header/>
   <Dialog
        open={openCartPanel}
        fullWidth = {"lg"}
        maxWidth = {"sm"}
        onClose={handleCloseCartpanel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description "
        className='cartPanel'
      >
        
        <DialogContent>
          <div className='flex items-center w-full productDetailsModalContainer relative'>
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
             !absolute top-[15px] right-[15px] !bg-[#f1f1f1]' onClick={handleCloseCartpanel}>
              <IoCloseSharp className='text-[20px]' />
              </Button>
          
             <div className="col2 w-[100%] py-8 px-8 pr-16 productContent">
              <CartPanel/>
              
             </div>

          </div>
  </DialogContent>
  </Dialog>
    <Routes>
      <Route path='/' element={<Home/>} />
    
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SingUp/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/productListing/:category' element={<ProductListing/>} />
      <Route path='*' element={<NotFound/>} />
      <Route path='/cart/:id' element={<CartPage/>} />
      <Route path='/checkout' element={<ChecKOut/>} />
      <Route path='/wishlist' element={<WishList/>} />
      <Route path='/verify' element={<Verify/>} />
       <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/my-account' element={<MyAccount/>} />
      
    </Routes>
    <Footer/>
   </BrowserRouter>

    <Dialog
        open={openProductDetailsModel}
        fullWidth = {fullWidth}
        maxWidth = {maxWidth}
        onClose={handleCloseProductDetailsModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description "
        className='productDetailsModel'
      >
        
        <DialogContent>
          <div className='flex items-center w-full productDetailsModalContainer relative'>
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
             !absolute top-[15px] right-[15px] !bg-[#f1f1f1]' onClick={handleCloseProductDetailsModel}>
              <IoCloseSharp className='text-[20px]' />
              </Button>
            {/* <div className="col1 w-[40%]">
             <ProductZoom/>
            </div> */}
             <div className="col2 w-[100%] py-8 px-8 pr-16 productContent">
              <ProductDetailsComponent/>
             </div>

          </div>
  </DialogContent>
  </Dialog>


   
    </>
  )
}

export default App
