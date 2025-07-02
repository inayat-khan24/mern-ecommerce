import React, { useEffect, useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const ProductZoom = () => {
  const[slideIndex,setSlideIndex]=useState(0)
  const zoomSliderBig = useRef()
  const zoomSliderSml = useRef()




  const goto =(index)=>{
    
      setSlideIndex(index)
       if (zoomSliderSml.current && zoomSliderSml.current.swiper) {
      zoomSliderSml.current.swiper.slideTo(index); // Go to slide in the small slider
    }

    if (zoomSliderBig.current && zoomSliderBig.current.swiper) {
      zoomSliderBig.current.swiper.slideTo(index); // Go to slide in the big slider
    }
  

  }
  

  return (
  <>
      <div className='flex gap-3'>
        {/* add vertical swiper slider */}
        <div className="slider w-[15%]">

          <Swiper
            ref={zoomSliderSml}
            direction="vertical"
            slidesPerView={5}
            navigation={true} 
            spaceBetween={10}
            modules={[Navigation]}
            className="zoomProductSliderThumbs h-[500px] overflow-hidden"      
          >
          
                  <SwiperSlide>
                    <div className={`item rounded-md overflow-hidden cursor-pointer group 
                    ${slideIndex === 0 ? "opacity-1" : "opacity-30"}`}
                       onClick={()=>goto(0)} >
                      <img src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-0-202407191138.jpg?im=Resize=(75,94)"
                       alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div  className={`item rounded-md overflow-hidden cursor-pointer group 
                    ${slideIndex === 1? "opacity-1" : "opacity-30"}`}
                     onClick={()=>goto(1)}>
                      <img src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-1-202407191138.jpg?im=Resize=(75,94)"
                       alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div  className={`item rounded-md overflow-hidden cursor-pointer group 
                    ${slideIndex === 2 ? "opacity-1" : "opacity-30"}`}
                       onClick={()=>goto(2)}>
                      <img src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-2-202407191138.jpg?im=Resize=(75,94)"
                       alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className={`item rounded-md overflow-hidden cursor-pointer group 
                    ${slideIndex === 3 ? "opacity-1" : "opacity-30"}`}
                       onClick={()=>goto(3)}>
                      <img src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-3-202407191138.jpg?im=Resize=(75,94)"
                       alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className={`item rounded-md overflow-hidden cursor-pointer group 
                    ${slideIndex === 4 ? "opacity-1" : "opacity-30"}`}
                       onClick={()=>goto(4)}>
                      <img src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-4-202407191138.jpg?im=Resize=(75,94)"
                       alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className={`item rounded-md overflow-hidden cursor-pointer group 
                    ${slideIndex === 5 ? "opacity-1" : "opacity-30"}`}
                       onClick={()=>goto(5)} >
                      <img src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-0-202407191138.jpg?im=Resize=(75,94)"
                       alt=""  className='w-full transition-all group-hover:scale-105'/>
                    </div>
                  </SwiperSlide>
                  
                  <SwiperSlide>
                    
                  </SwiperSlide>

                </Swiper>
        </div>

     <div className='zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md'>
     <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false} 
            
            >
           
          <SwiperSlide>
       <InnerImageZoom zoomType='hover' zoomScale={1}
       src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-0-202407191138.jpg?im=Resize=(600,750)"
       />
       </SwiperSlide>
       
       

       <SwiperSlide>
       <InnerImageZoom zoomType='hover' zoomScale={1}
       src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-1-202407191138.jpg?im=Resize=(600,750)"
       />
       </SwiperSlide>

       <SwiperSlide>
       <InnerImageZoom zoomType='hover' zoomScale={1}
       src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-2-202407191138.jpg?im=Resize=(600,750)"
       />
       </SwiperSlide>

       <SwiperSlide>
       <InnerImageZoom zoomType='hover' zoomScale={1}
       src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-3-202407191138.jpg?im=Resize=(600,750)"
       />
       </SwiperSlide>

       <SwiperSlide>
       <InnerImageZoom zoomType='hover' zoomScale={1}
       src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-4-202407191138.jpg?im=Resize=(600,750)"
       />
       </SwiperSlide>

     
       <SwiperSlide>
       <InnerImageZoom zoomType='hover' zoomScale={1}
       src="https://www.jiomart.com/images/product/original/rvqijrykka/fabflee-women-printed-casual-crepe-ethnic-top-product-images-rvqijrykka-0-202407191138.jpg?im=Resize=(600,750)"
       />
       </SwiperSlide>
       
       
                          
       
       </Swiper>
     </div>
    
    </div>
  </>
  )
}

export default ProductZoom
