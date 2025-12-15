import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { Collapse, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import RangeProduct from "../RangeProduct"; // Assuming you have this

const Sidebar = ({ selectedCategories, setSelectedCategories }) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
  const [isOpenRatingFilter, setIsOpenRatingFilter] = useState(true);
  const [shopbyCategoryList, setShopbyCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  // Mock Data (Moved outside component or keep static)
  const Availability = ["Available (17)", "In Stock (10)", "Not Available (1)"];
  const size = ["Small (S)", "Medium (M)", "Large (L)", "XL", "XXL"];

  // Fetch SubCategories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("https://mern-ecommerce-8jrd.onrender.com/api/getAllSubCategories");
        const result = await res.json();
        setShopbyCategoryList(result.subcategories || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  // Filter Logic based on Route Params
  const filterSubCategory = category 
    ? shopbyCategoryList.filter((cat) => cat.categoryId?.categoryName === category)
    : shopbyCategoryList;

  const handleChange = (e, id) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      setSelectedCategories(selectedCategories.filter((item) => item !== id));
    }
  };

  // Reusable Filter Section Component
  const FilterSection = ({ title, isOpen, setIsOpen, children }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4 transition-all hover:shadow-md">
      <div 
        className="flex items-center justify-between cursor-pointer group" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider group-hover:text-[#ff5252] transition-colors">
          {title}
        </h3>
        <Button className="!min-w-[30px] !w-[30px] !h-[30px] !rounded-full !text-gray-500 group-hover:!bg-gray-100 group-hover:!text-[#ff5252]">
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </Button>
      </div>
      <Collapse in={isOpen}>
        <div className="mt-3 custom-scrollbar max-h-[200px] overflow-y-auto pr-2">
          {children}
        </div>
      </Collapse>
    </div>
  );

  return (
    <aside className="sidebar w-full h-full">
      
      {/* 1. SubCategories Filter */}
      <FilterSection 
        title="Sub Categories" 
        isOpen={isOpenCategoryFilter} 
        setIsOpen={setIsOpenCategoryFilter}
      >
        {loading ? (
          [...Array(5)].map((_, i) => <Skeleton key={i} height={30} />)
        ) : filterSubCategory.length > 0 ? (
          filterSubCategory.map((item, index) => (
            <div key={item._id || index} className="flex items-center hover:bg-gray-50 rounded-lg px-2 transition-colors">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={selectedCategories.includes(item._id)}
                    onChange={(e) => handleChange(e, item._id)}
                    sx={{
                      color: '#c4c4c4',
                      '&.Mui-checked': { color: '#ff5252' },
                    }}
                  />
                }
                label={<span className="text-sm text-gray-600 font-medium">{item.subCategoryName}</span>}
                className="w-full !m-0 !py-1"
              />
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 p-2">No subcategories found.</p>
        )}
      </FilterSection>

      {/* 2. Price Range (Imported Component) */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Price Range</h3>
        <RangeProduct />
      </div>

      {/* 3. Availability Filter */}
      <FilterSection 
        title="Availability" 
        isOpen={isOpenAvailFilter} 
        setIsOpen={setIsOpenAvailFilter}
      >
        {Availability.map((label, index) => (
          <div key={index} className="flex items-center hover:bg-gray-50 rounded-lg px-2">
            <FormControlLabel
              control={
                <Checkbox 
                  size="small" 
                  sx={{ color: '#c4c4c4', '&.Mui-checked': { color: '#ff5252' } }} 
                />
              }
              label={<span className="text-sm text-gray-600">{label}</span>}
              className="w-full !m-0 !py-1"
            />
          </div>
        ))}
      </FilterSection>

      {/* 4. Size Filter */}
      <FilterSection 
        title="Size" 
        isOpen={isOpenSizeFilter} 
        setIsOpen={setIsOpenSizeFilter}
      >
        {size.map((label, index) => (
          <div key={index} className="flex items-center hover:bg-gray-50 rounded-lg px-2">
            <FormControlLabel
              control={
                <Checkbox 
                  size="small" 
                  sx={{ color: '#c4c4c4', '&.Mui-checked': { color: '#ff5252' } }} 
                />
              }
              label={<span className="text-sm text-gray-600">{label}</span>}
              className="w-full !m-0 !py-1"
            />
          </div>
        ))}
      </FilterSection>

      {/* 5. Rating Filter */}
      <FilterSection 
        title="Rating" 
        isOpen={isOpenRatingFilter} 
        setIsOpen={setIsOpenRatingFilter}
      >
        {[5, 4, 3, 2, 1].map((val) => (
          <div key={val} className="flex items-center gap-2 py-1 px-2 hover:bg-gray-50 rounded-lg cursor-pointer">
             <Checkbox 
                size="small" 
                sx={{ padding: 0, marginRight: 1, color: '#c4c4c4', '&.Mui-checked': { color: '#ffb400' } }} 
             />
             <Rating name="read-only" value={val} readOnly size="small" />
             <span className="text-xs text-gray-400 ml-auto">{val}.0+</span>
          </div>
        ))}
      </FilterSection>

    </aside>
  );
};

export default Sidebar;