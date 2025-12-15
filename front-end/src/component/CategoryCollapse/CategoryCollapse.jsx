import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";

const CategoryCollapse = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchCategory = async () => {
    setLoader(true);
    try {
      const res = await fetch(
        "https://mern-ecommerce-8jrd.onrender.com/api/getAllSubCategories"
      );
      const result = await res.json();
      setCategoryList(result.subcategories);
    } catch (error) {
      console.log("Category Fetch Error:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // 🔹 Group categories
  const groupedCategories = categoryList.reduce((acc, item) => {
    const categoryName = item.categoryId.categoryName;
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(item);
    return acc;
  }, {});

  if (loader) return <div>Loading...</div>;

  return (
    <div className="scroll">
      <ul className="w-full">
        {Object.keys(groupedCategories).map((category, index) => (
          <li key={index} className="list-none relative">
            
            {/* Category Link */}
            <NavLink to={`/productListing/${category}`}>
              <Button className="w-full !text-left !justify-start !px-3">
                {category}
              </Button>
            </NavLink>

            {/* Plus / Minus Toggle */}
            {submenuIndex === index ? (
              <FiMinusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => setSubmenuIndex(null)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => setSubmenuIndex(index)}
              />
            )}

            {/* Subcategories */}
            {submenuIndex === index && (
              <ul className="pl-5">
                {groupedCategories[category].map((sub) => (
                  <li key={sub._id}>
                    <Link to={`/category/${sub.subCategoryName}`}>
                      <Button className="w-full !text-left !justify-start !px-3">
                        {sub.subCategoryName}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCollapse;
