import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import Productitem from './Productitem.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { ThemeContext } from '../store/create.jsx';


const ProductsSlider = (props) => {
 const {items} = useContext(ThemeContext)



  return (
    <div className='productsSlider py-3'>
      <Swiper
              slidesPerView={props.items}
              navigation={true} 
              spaceBetween={10}
              modules={[Navigation]}
              className="mySwiper"
            >
      
            {
              items.map((item,index)=>{
                
                const {productDescription,productName,
productRating,productPrice,productImage,_id
} = item



                return <SwiperSlide key={index}>
                  
                 <Productitem 
                 productDescription={productDescription}
                 productName = {productName} productImage={productImage} 
                 productPrice={productPrice}
                 productID = {_id}
                 index={index}
                productRating={productRating}/>
                 
              </SwiperSlide>
              })
            }
               
                


        </Swiper>
    </div>
  )
}

export default ProductsSlider 