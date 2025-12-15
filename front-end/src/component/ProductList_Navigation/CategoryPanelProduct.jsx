import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import Sidebar from '../Sidebar/Sidebar';

const CategoryPanelProduct = ({ 
  isOpenCatpanelFilter, 
  setIsOpenCatpanelFilter,
  // These props must be passed from ProductListing.jsx
  selectedCategories = [],
  setSelectedCategories = () => {} 
}) => {
  
  const toggleDrawer = (newOpen) => () => {
    setIsOpenCatpanelFilter(newOpen);
  };

  return (
    <Drawer 
      anchor="right" 
      open={isOpenCatpanelFilter} 
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: { width: '85%', maxWidth: '360px' }
      }}
    >
      <Box 
        role="presentation" 
        className="h-full flex flex-col bg-[#f4f5f7]"
      >
        
        {/* 1. Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <MdFilterList className="text-[#ff5252]" /> Filter Products
          </h3>
          <button 
            onClick={toggleDrawer(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#ff5252] hover:text-white transition-all"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>

        {/* 2. Scrollable Content (Sidebar) */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* We pass the state props down to the Sidebar */}
          <Sidebar 
            selectedCategories={selectedCategories} 
            setSelectedCategories={setSelectedCategories} 
          />
        </div>

        {/* 3. Footer Actions */}
        <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-10 flex gap-3">
          <Button 
            variant="outlined" 
            className="!flex-1 !border-gray-300 !text-gray-700 !capitalize !font-semibold"
            onClick={() => {
              setSelectedCategories([]); // Clear filters
              // Optional: setIsOpenCatpanelFilter(false);
            }}
          >
            Clear All
          </Button>
          <Button 
            variant="contained" 
            className="!flex-1 !bg-[#ff5252] !text-white !capitalize !font-bold shadow-md"
            onClick={toggleDrawer(false)}
          >
            Apply Filters
          </Button>
        </div>

      </Box>
    </Drawer>
  );
};

export default CategoryPanelProduct;