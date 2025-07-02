import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from 'react-icons/fi';

const CategoryCollapse = () => {
    const [submenuIndex,setSubmenuIndex] = useState(null)
    const [innerSubmenuIndex,setInnerSubmenuIndex] = useState(null)

 

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
  
  return (
     
<div className="scroll">
      <ul className='w-full'>
  <li className='list-none flex items-center relative flex-col'>
    <Link to="/" className='w-full'>
           <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'> 
            Fashion
            </Button>
            </Link>
            {/* plus and manas function for Submenu     */}
{
    submenuIndex ===0 ? <FiMinusSquare  className='absolute top-[10px] right-[15px] cursor-pointer' 
    onClick={()=>openSubmenu(0)}
    /> 
    :
    <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' 
          onClick={()=>openSubmenu(0)}
          />
    }

        

          {
            submenuIndex === 0 && 
            <ul className="submenu  w-full pl-3 ">
                      <li className='list-none relative'>
                        <Link to="/" className='w-full'>
                      <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'> 
                        Apparel
                        </Button>
                        </Link>
                  {/* plus and manas function for innerSubmenu     */}
                        {
    innerSubmenuIndex ===0 ? <FiMinusSquare  className='absolute top-[10px] right-[15px] cursor-pointer' 
    onClick={()=>openInnerSubmenu(0)}
    /> 
    :
    <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' 
          onClick={()=>openInnerSubmenu(0)}
          />
    }


{/* // inner submenu */}

{

innerSubmenuIndex === 0 && 


            
<ul className="inner_submenu  w-full pl-3 ">
<li className='list-none relative mb-1'>
    <Link to="/" className='link w-full !text-left !justify-start !px-3 
  transition text-[14px]'> 
    Smart Tablet
    </Link>
</li>

<li className='list-none relative mb-1'>
    <Link to="/" className='link w-full !text-left !justify-start !px-3 
  transition text-[14px]'> 
    Crepe T-Shirt 
    </Link>
</li>


<li className='list-none relative mb-1'>
    <Link to="/" className='link w-full !text-left !justify-start !px-3 
  transition text-[14px]'> 
    Leather Watch
    </Link>
</li>

<li className='list-none relative mb-1'>
    <Link to="/" className='link w-full !text-left !justify-start !px-3 
  transition text-[14px]'> 
    Rolling Daimond
    </Link>
</li>




</ul>

}

            
            
            
            
                        
                              </li>
                          </ul>


          }

          </li>


{/* second part */}
<li className='list-none flex items-center relative flex-col'>
    <Link to="/" className='w-full'>
           <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'> 
            Outerwear
            </Button>
            </Link>
            {/* plus and manas function for Submenu     */}
{
    submenuIndex === 1 ? <FiMinusSquare  className='absolute top-[10px] right-[15px] cursor-pointer' 
    onClick={()=>openSubmenu(1)}
    /> 
    :
    <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' 
          onClick={()=>openSubmenu(1)}
          />
    }

        

          { submenuIndex === 1 && (
                     <ul className="submenu  w-full pl-3 ">
                      <li className='list-none relative'>
                        <Link to="/" className='w-full'>
                      <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'> 
                        Apparel
                        </Button>
                        </Link>
                  {/* plus and manas function for innerSubmenu     */}
            { innerSubmenuIndex ===1 ? (<FiMinusSquare  className='absolute top-[10px] right-[15px] cursor-pointer' 
              onClick={()=>openInnerSubmenu(1)}
                /> 
            ):(
            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' 
              onClick={()=>openInnerSubmenu(1)}
          />
                 )}


{/* // inner submenu                */}

{innerSubmenuIndex === 1 &&  (
    <ul className="inner_submenu  w-full pl-3 ">
    <li className='list-none relative mb-1'>
        <Link to="/" className='link w-full !text-left !justify-start !px-3 
    transition text-[14px]'> 
        Smart Tablet
        </Link>
    </li>

    <li className='list-none relative mb-1'>
        <Link to="/" className='link w-full !text-left !justify-start !px-3 
    transition text-[14px]'> 
        Crepe T-Shirt 
        </Link>
    </li>


    <li className='list-none relative mb-1'>
        <Link to="/" className='link w-full !text-left !justify-start !px-3 
    transition text-[14px]'> 
        Leather Watch
        </Link>
    </li>

    <li className='list-none relative mb-1'>
        <Link to="/" className='link w-full !text-left !justify-start !px-3 
    transition text-[14px]'> 
        Rolling Daimond
        </Link>
              </li>
            </ul>
            )}
           </li>
        </ul>
          )}

          </li>
{/* second part end */}
      </ul>
   </div>     



  )
}

export default CategoryCollapse
