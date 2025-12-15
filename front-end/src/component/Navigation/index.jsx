import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import CategoryPanel from './CategoryPanel';
import CategorySlider from './CategorySlider';
import './style.css'; // Ensure this exists or remove if using Tailwind

const Navigation = () => {
  const [isOpenCatpanel, setIsOpenCatpanel] = useState(false);

  return (
    <>
      <nav className="border-b border-gray-200 bg-white py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-4">
          
          {/* Sidebar Trigger Button */}
          <div className="w-full md:w-auto flex-shrink-0">
            <Button 
              onClick={() => setIsOpenCatpanel(true)}
              className="!bg-[#ff5252] !text-white !font-semibold !text-xs !py-2 !px-4 !rounded-full !w-full md:!w-auto flex justify-between md:justify-center gap-2 shadow-md hover:!bg-[#e04040]"
            >
              <span className="flex items-center gap-2">
                <RiMenu2Fill className='text-lg' /> Shop By Categories
              </span>
              <LiaAngleDownSolid className='text-sm' />
            </Button>
          </div>

          {/* Category Slider - Takes remaining space */}
          <div className="w-full md:flex-1 overflow-hidden min-w-0">
            <CategorySlider />
          </div>
          
        </div>
      </nav>

      {/* Slide Out Panel */}
      <CategoryPanel 
        isOpenCatpanel={isOpenCatpanel} 
        setIsOpenCatpanel={setIsOpenCatpanel}
      />
    </>
  );
};

export default Navigation;