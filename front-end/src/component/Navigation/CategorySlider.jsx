import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Category from './Category';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'

// Import Swiper styles
// import 'swiper/css';

const CategorySlider = () => {
const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [slidBox, setSlidBox] = useState(10);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
     
        if (width <= 600) {
      setSlidBox(3); // Smallest screens
    } else if (width <= 900) {
      setSlidBox(4);
    } else if (width <= 1300) {
      
      setSlidBox(6);
    } else if (width <= 1644) {
      setSlidBox(8); 
    } else if (width <= 2090) {
      setSlidBox(10);
    } else {
      setSlidBox(12); // For extra large screens
    }
        
    };

    // Initial check
    handleResize();

    // Listen for resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [screenWidth]);

  
  const [categoryList, setCategoryList] = useState([]);
  const fetchCategory = async () => {
    try {
      const res = await fetch(
        "https://mern-ecommerce-n4t6.onrender.com/api/getAllCategories"
      )
      const result = await res.json()
      
      setCategoryList(result)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchCategory()
    
  }, [screenWidth])

  
  return (
    <div >
         <Swiper
      spaceBetween={-160}
      slidesPerView={slidBox}
   
      // className='flex items-center'
    >
       <SwiperSlide > 
 <Link to="/" className='link transition text-[14px] font-[500]'>
      <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>
        Home
      </Button>
    </Link>

       </SwiperSlide>
      
    {
      categoryList.map((categoryList,index)=>{
        
        const {categoryName,_id} = categoryList
        
       
  return<SwiperSlide key={index}>
    <Category categoryName={categoryName} categoryID={_id}/>
    </SwiperSlide>
      })
    }
  
    </Swiper>
    </div>
  )
}

export default CategorySlider
