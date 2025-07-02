import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../component/Navigation'

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link'; 

import Button  from '@mui/material/Button';
import { IoGridSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Sidebar from '../component/Sidebar/Sidebar';
import Productitem from '../component/Productitem';
import { ThemeContext } from '../store/create';
import ProductitemListView from '../component/ProductitemListView/ProductitemListView';
import { Alert, Dialog, DialogContent, Tooltip } from '@mui/material';
import { IoCloseSharp } from "react-icons/io5";
import FilterProductDetail from '../component/filterProductDetail';
import { RiMenu2Fill } from 'react-icons/ri';
import { LiaAngleDownSolid } from 'react-icons/lia';
import CategoryPanelProduct from '../component/ProductList_Navigation/CategoryPanelProduct';

const ProductListing = () => {
 const {filteredProductsS,searchBox,values,
  items,handleCategory,catFilter,setItems,fullWidth,maxWidth} = useContext(ThemeContext)
 const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [shortBy,setShortBy]= useState("high to low")
const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel(false);
  }; 
  const [filteredProducts, setFilteredProducts] = useState(items);

  // for product filter
  const [isOpenCatpanel,setIsOpenCatpanel] = useState(false)



 useEffect(() => {
    let updatedProducts = [...items];
    

    // Category filter
    if (catFilter) {
      updatedProducts = updatedProducts.filter(
        (product) => product.productCategory === catFilter
        
      );
     
    }

    // Search filter
    if (searchBox.trim()) {
      updatedProducts = updatedProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchBox.toLowerCase())
      );}

      // selected sub cetagory
  if (selectedCategories.length > 0) {
  updatedProducts = updatedProducts.filter(
    (product) => selectedCategories.includes(product.productSubCategory)
  );
}
// Convert sort option string (like "Highest to Lowest") to a consistent format
const sortByKey = shortBy.trim().replace(/\s+/g, '').toLowerCase();

if (sortByKey === "highesttolowest") {
  
  updatedProducts = updatedProducts.sort((a, b) => b.productPrice - a.productPrice);
}


if (sortByKey === "lowtohigh") {
  updatedProducts = updatedProducts.sort((a, b) => a.productPrice - b.productPrice);
}

if (sortByKey === "atoz") {
  updatedProducts = updatedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
}

if (sortByKey === "ztoa") {
  updatedProducts = updatedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
}
 
if (values){

  updatedProducts = updatedProducts.filter(price => price.productPrice  >= values[0] && price.productPrice  <= values[1]);

}
  
  

    setFilteredProducts(updatedProducts);
  }, [searchBox, catFilter, items,selectedCategories,shortBy,values]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

 




   const [itemView,setItemView] = useState('grid');
   
    const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setShortBy(e)
  };

  // page ination 
   
   const [page, setPage] = useState(1);
   const [itemsPerPage,setitemsPerPage] = useState(4)
  

  // index calculate
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const handleChange = (event, value) => {
  setPage(value); 
  console.log("Selected Page:", value);
};

// fiter panel
 const [isOpenCatpanelFilter,setIsOpenCatpanelFilter] = useState(false)
 const [filterSlider,setFilterSlider] = useState(true)
 const openCategorypanelFilter =()=>{
  setIsOpenCatpanelFilter(true);}


const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [slidBox, setSlidBox] = useState(10);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log(width)
     if(width <= 1039){
      setFilterSlider(false)
     }else{
      setFilterSlider(true)
     }
    }

    // Initial check
    handleResize();

    // Listen for resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filterSlider]);



  return (
    
    <>
    <div
     className='container   w-[50%] min-w-[100%] bg-[#e7e2e2] pb-2 flex flex-col *
     items-center justify-center
     '>

{/* NavBar section */}
      <section className='mt-2  w-[98%] bg-white'>
        <Navigation />
      </section>

{/* braad section*/}
      <section className='w-[98%] py-3'>
         <div className='container pl-4'>
              {/* braad crumbs added */}           
      <Breadcrumbs aria-label="breadcrumb">
        <Link 
        underline="hover" 
        color="inherit" 
        href="/"
        className='link transition'
        >
             Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/"
          className='link transition'
        >
          Fashion
        </Link>       
      </Breadcrumbs>
        </div>
    {/* braad crumbs ended */}
</section>
 {/* productDetail section */}
 <section className='w-[98%] bg-white'>
  <div className='bg-white p-2 mt-4'>
             <div className="container flex gap-3">    
{/* //Shop by Category,Shop by Category,Size      */}

 {
filterSlider?(
<div className="sidebarWraper w-[20%] h-full bg-white ">
                <Sidebar 
                setSelectedCategories={setSelectedCategories}
                selectedCategories={selectedCategories}/>
            </div>  
)
: (
  <>
   <div className="col_1  w-[14%]  max-sm:w-full]">
            <Button className='!text-black !text-[0.5rem] !font-[600] gap-2  w-full'
           onClick={openCategorypanelFilter}
            >
                <RiMenu2Fill  className='text-[18px]'/> filter Products 
                <LiaAngleDownSolid className='text-[13px] pl-1 font-bold'/> </Button>
        </div>
  <CategoryPanelProduct  isOpenCatpanelFilter={isOpenCatpanelFilter} 
setIsOpenCatpanelFilter={setIsOpenCatpanelFilter}
/>
  </>
  

)
}



            
            

            <div className='rightContent w-[80%] py-3'>
                <div className='bg-[#f1f1f1] p-2 w-full mb-4 rounded-md flex items-center justify-between'>
                    <div className="col1 flex items-center itemViewActions">
                        {/* menu list button */}
        <Tooltip title="List">
                              <Button
                     className={`!w-[40px] !h-[40px] ${itemView=="list"&&"!bg-[#ec4444] !text-white"} !min-w-[40px] !rounded-full !text-[#000] 
                      ${itemView=="list"&&"active"}`}
                       onClick={()=>{
                        setItemView('list'); 
                        setitemsPerPage(3);
                        } }> 
                            <LuMenu className='text[rgba(0,0,0,0.7)]' /> 
                        </Button>
          </Tooltip>
                        {/* grid button */}
          <Tooltip title="grid">             
                        <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] 
                      ${itemView=="grid"&&"!bg-[#ec4444] !text-white"}`}
                          onClick={()=>{setItemView('grid');
                            setitemsPerPage(4);
                          }}> 
                            <IoGridSharp className='text[rgba(0,0,0,0.7)]' /> 
                        </Button>
          </Tooltip>  
                        <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>{`There are ${filteredProducts.length} products.`}</span>
                    </div>


                    
                    {/* Short By */}
                    <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                      <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>Short By</span>
                      {/* menu button  */}
                      <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                className='!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]'
                            >
                                {shortBy}
                    </Button>



                        {/* menu  */}
                        <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                        >
                                
                                <MenuItem
                                 onClick={()=>handleClose("Relevance")}
                                 className='!bg-white !text-[13px] !text-[#000] !capitalize ' >Relevance</MenuItem>
                                <MenuItem
                                onClick={()=>handleClose("A to Z")}
                                 className='!bg-white !text-[13px] !text-[#000] !capitalize ' 
                                 > A to Z</MenuItem>
                                <MenuItem 
                                onClick={()=>handleClose("Z to A")}
                                  className='!bg-white !text-[13px] !text-[#000] !capitalize'  >Z to A</MenuItem>
                                <MenuItem onClick={()=>handleClose("low to high")}
                                    className='!bg-white !text-[13px] !text-[#000] !capitalize' value="Price, low to high" >low to high</MenuItem>
                                <MenuItem onClick={()=>handleClose("high to low")}
                                   className='!bg-white !text-[13px] !text-[#000] !capitalize' value="Price, high to low" >high to low</MenuItem>
                                
                                
                        </Menu>


                    </div>
                </div>
{/* // this is grid produt */}
                <div className={`grid ${itemView==='grid'?'grid-cols-4 max-sm:grid-cols-3 md:grid-cols-4':'grid-cols-1 md:grid-cols-1'} gap-4`}>
                    {
                        itemView === 'grid' ?
                        <>
                        
          {
                  filteredProducts.slice(indexOfFirstItem ,indexOfLastItem).map((items,index)=>{
                    
                        const {productDescription,productName,
productRating,productPrice,productImage,_id
} = items
                       return   <Productitem  key={index}
                       setOpenProductDetailsModel={setOpenProductDetailsModel}
                 productDescription={productDescription}
                 productName = {productName} 
                 productImage={productImage} 
                 productID = {_id}
                 
                 productPrice={productPrice}
                 index={index}
                productRating={productRating}/>
                  })
                }
                        
                    
                    
                        </> 
                         
                        : 
                        
                        <>
   {/* // this is List produt */}
                        {
                          filteredProducts.slice(indexOfFirstItem ,indexOfLastItem).map((items,index)=>{
                               const {productDescription,productName,
productRating,productPrice,productImage
} = items
                           return  <ProductitemListView 
                           setOpenProductDetailsModel={setOpenProductDetailsModel} 
                          key={index}
                 productDescription={productDescription}
                 productName = {productName} productImage={productImage} 
                 productPrice={productPrice}
                 index={index}
                productRating={productRating}/>
                          
                          })
                        }
                       
                      
                        
                        
                        </>
                       
                        
                      
                    }
                    
                </div>
                
                <div className='flex items-center justify-center mt-10'>
                <Pagination 
                page={page} onChange={handleChange} 
                 color="primary" 
                count={10} showFirstButton showLastButton />

                </div>
            </div>
       </div>
    </div>   
    </section>



    </div>
    
  


     <Dialog
        open={openProductDetailsModel}
        fullWidth = {fullWidth}
        maxWidth = {maxWidth}
        onClose={handleCloseProductDetailsModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description "
        className='productDetailsModel'
      >
        
        <DialogContent>
          <div className='flex items-center w-full productDetailsModalContainer relative'>
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
             !absolute top-[15px] right-[15px] !bg-[#f1f1f1]' onClick={handleCloseProductDetailsModel}>
              <IoCloseSharp className='text-[20px]' />
              </Button>
            {/* <div className="col1 w-[40%]">
             <ProductZoom/>
            </div> */}
             <div className="col2 w-[100%] py-8 px-8 pr-16 productContent">
             <FilterProductDetail filteredProducts={filteredProducts}/>
             </div>

          </div>
  </DialogContent>
  </Dialog>
    </>
  )
}

export default ProductListing
