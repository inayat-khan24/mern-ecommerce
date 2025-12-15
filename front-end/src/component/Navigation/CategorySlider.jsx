import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import Category from "./Category";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Skeleton } from "@mui/material";

const CategorySlider = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchCategory = async () => {
    try {
      const res = await fetch(`http://localhost:30045/api/getAllCategories`);
      const result = await res.json();
      setCategoryList(result.data || []);
    } catch (error) {
      console.error("Category Fetch Error:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  if (loader) {
    // Simple Skeleton Loader
    return (
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" width={100} height={40} className="rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 10 },
          640: { slidesPerView: 4, spaceBetween: 15 },
          768: { slidesPerView: 5, spaceBetween: 20 },
          1024: { slidesPerView: 7, spaceBetween: 25 },
          1280: { slidesPerView: 9, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        <SwiperSlide className="!w-auto">
           <Link to="/" className="no-underline">
            <Button className="!text-gray-700 !font-bold !bg-gray-100 hover:!bg-[#ff5252] hover:!text-white !rounded-full !px-5 !text-xs !capitalize transition-all">
              All 
            </Button>
          </Link>
        </SwiperSlide>

        {categoryList.map((item) => (
          <SwiperSlide key={item._id} className="!w-auto">
            <Category categoryName={item.categoryName} categoryID={item._id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;