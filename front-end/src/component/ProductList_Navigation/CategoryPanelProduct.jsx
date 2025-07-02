import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from '../CategoryCollapse/CategoryCollapse';
import Sidebar from '../Sidebar/Sidebar';





const CategoryPanelProduct = (props) => {
    const toggleDrawer = (newOpen) => () => { 
    props.setIsOpenCatpanelFilter(newOpen);
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

  // for side bar product
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">

      <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>Shop By Filter 
        <IoCloseSharp onClick={toggleDrawer(false)}  className='cursor-pointer text-[20px ]'/>
        </h3>

          <div className="sidebarWraper ml-4 w-[90%] h-full bg-white ">
                <Sidebar 
                setSelectedCategories={setSelectedCategories}
                selectedCategories={selectedCategories}/>
                
            </div> 
  </Box>
  );
    


  return (
    <div>
 
      <Drawer open={props.isOpenCatpanelFilter} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
  </div>

  )
}

export default CategoryPanelProduct;

