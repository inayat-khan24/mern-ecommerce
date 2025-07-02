import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";

const slides = [
  {
    image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/b516d52358d6b3d5.jpg?q=90",
    title: "Women Solid Round Green T-Shirt",
    price: 59,
  },
  {
    image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1bd9f11edbf77427.jpg?q=90",
    title: "Women Solid Round Green T-Shirt",
    price: 59,
  },
];

const HomeBannerV2 = () => {
  return (
    <Swiper
      loop
      spaceBetween={30}
      effect="fade"
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className="homeSliderV2"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full rounded-md overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full object-cover h-full"
            />
            <div className="info absolute top-0 right-[-100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex flex-col justify-center items-start transition-all duration-700">
              <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                Big Saving Days Sale
              </h4>
              <h2 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0">
                {slide.title}
              </h2>
              <h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0">
                Starting At Only
                <span className="text-[#ff5252] text-[30px] font-[700]">${slide.price}.00</span>
              </h3>
              <div className="w-full relative -right-[100%] opacity-0 btn_">
                <Button variant="contained" className="btn-org">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeBannerV2;
