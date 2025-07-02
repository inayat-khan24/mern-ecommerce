import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from '../CategoryCollapse/CategoryCollapse';





const CategoryPanel = (props) => {
    const toggleDrawer = (newOpen) => () => { 
    props.setIsOpenCatpanel(newOpen);
  };


  // for Submenu function
  const openSubmenu=(index)=>{
if (submenuIndex === index ) {
  setSubmenuIndex(null)
}else{

  setSubmenuIndex(index)
}

}

// for inner - Submenu function
const openInnerSubmenu=(index)=>{
  if (innerSubmenuIndex === index ) {
    setInnerSubmenuIndex(null)
  }else{
  
    setInnerSubmenuIndex(index)
  }
  
  }

  
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">

      <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>Shop By Categories 
        <IoCloseSharp onClick={toggleDrawer(false)}  className='cursor-pointer text-[20px ]'/>
        </h3>

        <CategoryCollapse/>
  </Box>
  );
    


  return (
    <div>
 
      <Drawer open={props.isOpenCatpanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
  </div>

  )
}

export default CategoryPanel;

