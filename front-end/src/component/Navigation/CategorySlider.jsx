import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Category from "./Category";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const CategorySlider = () => {
  const [slidBox, setSlidBox] = useState(10);
  const [categoryList, setCategoryList] = useState([]);

  // 🔥 Resize logic fixed (no dependency loop)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 600) setSlidBox(3);
      else if (width <= 900) setSlidBox(4);
      else if (width <= 1300) setSlidBox(6);
      else if (width <= 1644) setSlidBox(8);
      else if (width <= 2090) setSlidBox(10);
      else setSlidBox(12);
    };

    handleResize(); // initial run
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 API call (runs only once)
  const fetchCategory = async () => {
    try {
<<<<<<< HEAD
      const res = await fetch(
        "https://mern-ecommerce-n4t6.onrender.com/api/getAllCategories"
      )
      const result = await res.json()
      
      setCategoryList(result)
=======
      const res = await fetch("http://localhost:30045/api/getAllCategories");
      const result = await res.json();

      // IMPORTANT FIX: Ensure result is an array
      if (Array.isArray(result)) {
        setCategoryList(result);
      } else if (Array.isArray(result.data)) {
        setCategoryList(result.data);
      } else {
        console.log("Invalid API format:", result);
        setCategoryList([]);
      }
>>>>>>> 10c68e4ec69c205fb8436ee6b7b33814985bde2e
    } catch (error) {
      console.log("Category Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <Swiper spaceBetween={-160} slidesPerView={slidBox}>
        <SwiperSlide>
          <Link to="/" className="link transition text-[14px] font-[500]">
            <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
              Home
            </Button>
          </Link>
        </SwiperSlide>

        {categoryList.map((item, index) => {
          const { categoryName, _id } = item;

          return (
            <SwiperSlide key={_id || index}>
              <Category categoryName={categoryName} categoryID={_id} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
