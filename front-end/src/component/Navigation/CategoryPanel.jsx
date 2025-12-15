import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from '../CategoryCollapse/CategoryCollapse';

const CategoryPanel = ({ isOpenCatpanel, setIsOpenCatpanel }) => {
  
  const toggleDrawer = (newOpen) => () => {
    setIsOpenCatpanel(newOpen);
  };

  return (
    <Drawer 
      open={isOpenCatpanel} 
      onClose={toggleDrawer(false)}
      anchor="left"
      PaperProps={{
        sx: { width: '85%', maxWidth: '350px' }
      }}
    >
      <Box role="presentation" className="h-full flex flex-col">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Categories</h3>
          <button 
            onClick={toggleDrawer(false)} 
            className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
          >
            <IoCloseSharp size={24} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <CategoryCollapse />
        </div>
      </Box>
    </Drawer>
  );
};

export default CategoryPanel;