import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../store/create';

const Category = ({ categoryName, categoryID }) => {
  const { setCatfilter } = useContext(ThemeContext);

  return (
    <div 
      className="inline-block"
      onClick={() => setCatfilter(categoryID)}
    >
      <NavLink
        to={`/productListing/${categoryName}`}
        className={({ isActive }) => `
          block px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border
          ${isActive 
            ? "bg-[#ff5252] text-white border-[#ff5252] shadow-md" 
            : "bg-white text-gray-600 border-transparent hover:bg-gray-100 hover:text-[#ff5252]"
          }
        `}
      >
        {categoryName}
      </NavLink>
    </div>
  );
};

export default Category;