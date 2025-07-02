import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { ThemeContext } from '../../store/create';

const Category = ({ categoryName,categoryID}) => {
const {catFilter,setCatfilter}= useContext(ThemeContext)

const handleCategory = (id)=>{
  setCatfilter(id)
}




  return (
    <li className="list-none relative group ">
      <NavLink to={`/productListing/${categoryName}`}
      //  className="link transition text-[14px] font-[500]"
       className={({ isActive }) =>  isActive
            ? "text-blue-600   font-bold border-b-2 border-red-600 py-3 "
            : "text-gray-600 hover:text-blue-500"
        }
       >
       <Button
  onClick={() => handleCategory(categoryID)}
  className="w-[100px] h-[60px]  !text-black font-medium text-sm whitespace-normal text-center break-words p-2 mx-2 hover:text-[#ff5252] transition-all"
>
  {categoryName}
</Button>
         
      </NavLink>

    </li>
  )
}

export default Category;
