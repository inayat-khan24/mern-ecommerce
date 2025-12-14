import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { Collapse } from "@mui/material";
import RangeProduct from "../RangeProduct";
import {  useParams } from "react-router-dom";

const Sidebar = ({selectedCategories,setSelectedCategories}) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
 
    const {category} = useParams();

   

 

const Availability = ["Available (17)","In Stock (10)","Not Available (1)"]
const size = ["Small (17)","Medium (10)","Large (25)","XL (1)","XXL (3)"]

  const [shopbyCategoryList, setShopbyCategoryList] = useState([]);
  
  const filterSubCategory = shopbyCategoryList.filter((catu) => catu.categoryId.categoryName === category);

  const fetchCategory = async () => {
    try {
      const res = await fetch(
        "http://localhost:30045/api/getAllSubCategories"
      )
      const result = await res.json()

      setShopbyCategoryList(result)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchCategory()
    
  }, [])



const handleChange =(e,label)=>{

const isChecked = e.target.checked;

        if (isChecked) {
          setSelectedCategories([...selectedCategories, label]);
        } else {
          setSelectedCategories(selectedCategories.filter(item => item !== label));
        }

      }
   
  return (
    <aside className="sidebar py-5">
      {/* Shop by Category */}
      <div className="box">
        <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center">
          Shop by SubCategory
          <Button
            className="!w-[30px] !h-[30px] !min-w-[20px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
      {/* //Shop by Category close open function*/}
        <Collapse in={isOpenCategoryFilter}>
        <div className="scroll px-4 relative -left-[13px]">
  {filterSubCategory.map((label, index) => {

    const { _id ,subCategoryName} = label;
    
    return (
      <FormControlLabel
        key={index}
        control={<Checkbox
          size="small"
          checked={selectedCategories.includes(_id)}
          onChange={(e) => handleChange(e, _id)}
        />}
        label={subCategoryName}
        className="w-full"
      />
    );
  })}
</div>
        </Collapse>
      </div>

      {/* Availability */}
      <div className="box mt-3">
        <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center">
          Availability
          <Button
            className="!w-[30px] !h-[30px] !min-w-[20px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenAvailFilter(!isOpenAvailFilter)}
          >
            {isOpenAvailFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        {/* //Availabilitylose open function*/}
        <Collapse in={isOpenAvailFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            {Availability.map((label, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox size="small" />}
                label={label}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* Size */}
      <div className="box mt-3">
        <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center">
          Size
          <Button
            className="!w-[30px] !h-[30px] !min-w-[20px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
          >
            {isOpenSizeFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse in={isOpenSizeFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            {size.map((label, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox size="small" />}
                label={label}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* Filter By Price */}
      <RangeProduct />

      {/* Filter By Rating */}
      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600]">Filter By Rating</h3>
        {[5, 4, 3, 2, 1].map((val) => (
          <div key={val} className="w-full">
            <Rating name="size-small" defaultValue={val} size="small" readOnly />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
