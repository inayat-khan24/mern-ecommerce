import React, { useState } from 'react';
import { ThemeContext } from './create';
import { useEffect } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../component/notifiction';

const Provider = ({ children }) => {
  const [isLoading,setIsLoading] = useState(true)
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);
  const [updateCartComponent,setUpdateCartComponent] = useState(0)
  const [updateWishListComponent,setUpdateWishListComponent] = useState(0)
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [cartItems, setCartItems] = useState([]);
  
  // addCartList for add cart form addcart button 
  const [addCartList,setAddCartList] = useState([])
  const [wishlist,setWishList] = useState([]);
  const [productIndex, setProductIndex] = useState("");
  const [selectedQty,setSelectedQty] = useState(1)
  const [openCartPanel, setOpenCartPanel] =  useState(false);
   const [isLogin,setIsLogin] = useState(false)
// all data get from localStorage
   const userEmail = localStorage.getItem("email")
   const userName = localStorage.getItem("userName")
   const token = localStorage.getItem("token")
   const userID = localStorage.getItem("userID")
 

// fetch all product
  const [items,setItems] = useState([])
   const fetchDetails = async()=>{
   try {
     const res = await fetch("http://157.66.191.24:4447/api/product_getall")
     const result = await res.json()
    
     setItems(result.data)
     setIsLoading(false)
     
   } catch (error) {
    console.log(error)
   }
    }
    useEffect(()=>{
   fetchDetails()
    },[])
    const product = items[productIndex]
    


     
  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel(false);
  };
  const handleCloseCartpanel =()=>{
   setOpenCartPanel(false) 
  }

  // add Cart 
  const addCart = async (product) => {
     const {_id} = product
  
  const Token = localStorage.getItem('token')
  const addCart = {
  "productId" : _id,
  "userId": userID
}


  
try {
      const res = await axios.post('http://157.66.191.24:4447/api/addtocart', addCart,{
        
    headers: {
      Authorization: `Bearer ${Token}`,
    
  }
      } )
      
    const {message,totalProductsInCart,result} = res?.data
       if(res.status === 200){
 handleSuccess(message)           
              cartListFetch()
}
else if(res.status === 400){
 handleError(message)           
              
} 
} catch (error) {
      const {message} = error.response?.data
      
     handleError(message);
    }

  };
    

  // add wish list 
   const addWishList = async(product) => {
  const {_id} = product
  
  const Token = localStorage.getItem('token')
  const wishPost = {
  "productId" : _id,
  "userId": userID
}
  
try {
      const res = await axios.post('http://157.66.191.24:4447/api/addToWishlist', wishPost,{
        
    headers: {
      Authorization: `Bearer ${Token}`,
    
  }
      } )
     
      const {message} = res.data
      
       if(res.status === 201){
 handleSuccess(message)           
              wishListFetch()
}
          else if (res.status === 400){
              handleError("hello")
          }
    
    } catch (error) {
      const {message} = error.response?.data
      
     handleError(message);
    }


  };



 // Delete Cart Items
   const DeleteItems = async(id)=>{
    //  setCartItems(cartItems.filter((t) => t._id !== id));
    const userDelete = {
  "productId" :id,
  "userId": userID
    }
   
    try {
       await axios.delete("http://157.66.191.24:4447/api/removeFromCart",{     
    headers: {
      Authorization: `Bearer ${token}`},
    data: userDelete,
    })
       cartListFetch()
    } catch (error) {
      console.log(error)
    }
  
  }
  // put method and update Qty
     const QtyUpdate = async(productId,qty)=>{
    //  setCartItems(cartItems.filter((t) => t._id !== id));
    const productQty = {
  "productId" :productId,
  "userId": userID,
  "quantity" : qty
    }
    
   
    try {
    const res = await axios.put(
      "http://157.66.191.24:4447/api/updateQuantity",
      productQty,             // ye data hai
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res)
    cartListFetch()
  }catch (error) {
      console.log(error)
    }
  
  }

  // delete Wish list 
    const DeleteWishItems = async(id)=>{
  const userDelete = {
  "productId" :id,
  "userId": userID
    }
    try {
      const res = await axios.delete("http://157.66.191.24:4447/api/removeWishlistItem",{     
    headers: {
      Authorization: `Bearer ${token}`},
    data: userDelete,
    })
      wishListFetch()
    } catch (error) {
      console.log(error)
    }
    
    }




  // fetch cart list 
  const cartListFetch = async()=>{
   try {
  const res = await fetch(`http://157.66.191.24:4447/api/getcartproductbyid?userId=${userID }`,{
    headers :{
    Authorization: `Bearer ${token}`,
    }
  })
  const result = await res.json()
  setCartItems(result)
  setAddCartList(result?.cartItems)


} catch (error) {
  console.log(error)
}}
  useEffect(()=>{
    cartListFetch()
  },[])


//   // fetch wish list 
  const wishListFetch = async()=>{
   
try {
  const res = await fetch(`http://157.66.191.24:4447/api/getWishlist?userId=${userID}`,{
    headers :{
    Authorization: `Bearer ${token}`,
    }
  })
const result = await res.json()
const cartsData = result?.data
setWishList(cartsData)
  } catch (error) {
  console.log(error)
}
  }
useEffect(()=>{
    wishListFetch()
  },[])
console.log("store")

// filter method 
const [catFilter,setCatfilter] = useState("")
const [searchBox,setSearch] = useState("")

const filteredProducts = items.filter(item => item.productCategory === catFilter);
const handSearch=(e)=>{
setSearch(e.target.value)
}

  const filteredProductsS = items.filter((product) => {
   
    const matchesSearch = product.productName.toLowerCase().includes(searchBox.toLowerCase());
    const matchesCategory =  filteredProducts === 'All' || product.productCategory === filteredProducts;
    return matchesSearch && matchesCategory;
  });

  // range silder price
    const [values, setValues] = useState([0, 10000]);
  return (
    <ThemeContext.Provider
      value={{
        filteredProducts,handSearch,filteredProductsS,searchBox,setSearch,
        openProductDetailsModel,
        setOpenProductDetailsModel,
        fullWidth,
        setFullWidth,
        maxWidth,
        setMaxWidth,
        handleCloseProductDetailsModel,
        productIndex,
        setProductIndex,
        addCart,
        cartItems,setCartItems,
        selectedQty,setSelectedQty,
        openCartPanel, setOpenCartPanel,
        handleCloseCartpanel,DeleteItems,DeleteWishItems,
     setItems,
        wishlist, setWishList,addWishList,product,
        isLogin,setIsLogin,
        userID ,userEmail,userName,token,
        items,
        isLoading,setIsLoading,
        updateCartComponent,updateWishListComponent,
        // cartListFetch,
        wishListFetch,cartListFetch,
        QtyUpdate,
        catFilter,setCatfilter,
        values, setValues
      }}
      
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default Provider;
