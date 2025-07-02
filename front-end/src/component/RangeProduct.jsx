import React, { useContext, useState } from 'react'
import ReactRangeSliderInput from 'react-range-slider-input';

import 'react-range-slider-input/dist/style.css';
import { ThemeContext } from '../store/create';

const RangeProduct = () => {
   const {values, setValues} = useContext(ThemeContext)
   
  return (
    <div className="box mt-4">
         <h3 className='w-full  mb-3 text-[16px] font-[600] flex items-center pr-5'> Filter By Price 
         </h3>
         <ReactRangeSliderInput
           min={0}
        max={50000}
        step={100}
        value={values}
        onInput={setValues} // updates state as you drag
         /> 
         <div className='flex pt-4 pb-2 princeRange'>
               <span className='text-[13px]'>
                    From: <strong>₹{values[0]}</strong>
               </span>
               <span className='ml-auto text-[13px]'>
                    From: <strong>₹{values[1]}</strong>
               </span>
            </div>      
       </div>
  )
}

export default RangeProduct
