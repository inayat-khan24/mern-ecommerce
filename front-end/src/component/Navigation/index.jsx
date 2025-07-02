import React, { useEffect, useState } from 'react'
import Button  from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia"
import { GoRocket } from "react-icons/go";
import { Link } from 'react-router-dom';
import CategoryPanel from './CategoryPanel';
import './style.css'
import Category from './Category';
import CategorySlider from './CategorySlider';

const Navigation = () => {
  const [isOpenCatpanel,setIsOpenCatpanel] = useState(false)

const openCategorypanel =()=>{
  setIsOpenCatpanel(true);}


  return (
<>
<nav >
     <div className="container flex items-center justify-around   max-w-[150rem]  max-sm:max-w-[100rem]     max-sm:flex-col    gap-1">
        <div className="col_1 w-[14%]  max-sm:w-full]">
            <Button className='!text-black !text-[0.5rem] !font-[600] gap-2  w-full' onClick={openCategorypanel}>
                <RiMenu2Fill  className='text-[18px]'/> Shop By Categories 
                <LiaAngleDownSolid className='text-[13px] font-bold'/> </Button>
        </div>
  <div className="col_2  w-[66%]  max-sm:w-[100%] ">

<CategorySlider />
</div> 





    </div>
</nav>
{/*  catefory panel component */}
<CategoryPanel  isOpenCatpanel={isOpenCatpanel} 
setIsOpenCatpanel={setIsOpenCatpanel}
/>



</>
  )
}

export default Navigation;
