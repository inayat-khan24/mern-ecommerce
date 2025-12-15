import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// MUI Imports
import { 
  Typography, Breadcrumbs, Link, Button, Menu, MenuItem, 
  Pagination, Dialog, DialogContent, Tooltip, useMediaQuery, Box 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons
import { IoGridSharp, IoCloseSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { RiMenu2Fill } from 'react-icons/ri';
import { LiaAngleDownSolid } from 'react-icons/lia';

// Context & Components
import Navigation from '../component/Navigation';
import Sidebar from '../component/Sidebar/Sidebar';
import Productitem from '../component/Productitem';
import ProductitemListView from '../component/ProductitemListView/ProductitemListView';
import CategoryPanelProduct from '../component/ProductList_Navigation/CategoryPanelProduct';
import FilterProductDetail from '../component/filterProductDetail';
import { ThemeContext } from '../store/create';

// --- Helper: Sort Logic ---
const sortProducts = (products, sortKey) => {
  const sorted = [...products];
  switch (sortKey.replace(/\s+/g, '').toLowerCase()) {
    case 'lowtohigh': return sorted.sort((a, b) => a.productPrice - b.productPrice);
    case 'hightolow': return sorted.sort((a, b) => b.productPrice - a.productPrice);
    case 'atoz': return sorted.sort((a, b) => a.productName.localeCompare(b.productName));
    case 'ztoa': return sorted.sort((a, b) => b.productName.localeCompare(a.productName));
    default: return sorted; // Relevance
  }
};

const ProductListing = () => {
  const theme = useTheme();
  // Use MUI hook for responsiveness instead of manual window listeners
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); 

  // --- Context Data ---
  const { 
    searchBox, values, items, catFilter, 
    fullWidth, maxWidth 
  } = useContext(ThemeContext);

  

  // --- Local State ---
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("Relevance");
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = viewMode === 'list' ? 5 : 8; // Dynamic per page based on view

  // Modals / Drawers
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);
  const [isOpenCatpanelFilter, setIsOpenCatpanelFilter] = useState(false);
  
  // Sort Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const openSortMenu = Boolean(anchorEl);

  // --- Filtering Logic (useMemo) ---
  // This automatically recalculates whenever dependencies change, no useEffect needed.
  const filteredProducts = useMemo(() => {
    let result = [...items];

    // 1. Global Search
    if (searchBox?.trim()) {
      result = result.filter((p) => 
        p.productName.toLowerCase().includes(searchBox.toLowerCase())
      );
    }

    // 2. Main Category Filter
    if (catFilter) {
      result = result.filter((p) => p.productCategory === catFilter);
    }

    // 3. Sub-Category Filter (Sidebar)
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.productSubCategory));
    }

    // 4. Price Range Filter
    if (values) {
      result = result.filter(p => p.productPrice >= values[0] && p.productPrice <= values[1]);
    }

    // 5. Sorting
    return sortProducts(result, sortBy);

  }, [items, searchBox, catFilter, selectedCategories, values, sortBy]);

  // --- Pagination Logic ---
  const count = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page, itemsPerPage]);

  // --- Handlers ---
  const handleSortClick = (event) => setAnchorEl(event.currentTarget);
  
  const handleSortClose = (option) => {
    setAnchorEl(null);
    if (option) setSortBy(option);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='w-full bg-[#f4f5f7] min-h-screen pb-10'>
      
      {/* 1. Navbar */}
      <section className='bg-white shadow-sm'>
        <div className="container mx-auto">
          <Navigation />
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className='container mx-auto px-4 py-4'>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Link underline="hover" color="inherit" href="/fashion">Fashion</Link>
          <Typography color="text.primary">Products</Typography>
        </Breadcrumbs>
      </div>

      {/* 3. Main Content Layout */}
      <section className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row gap-6'>

          {/* --- Left Sidebar (Filters) --- */}
          <div className='w-full md:w-[25%] lg:w-[20%]'>
            {isDesktop ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden h-fit sticky top-4">
                <Sidebar 
                  setSelectedCategories={setSelectedCategories}
                  selectedCategories={selectedCategories}
                />
              </div>
            ) : (
              // Mobile Filter Toggle
              <Button 
                variant="contained"
                color="inherit"
                className='w-full !justify-between !bg-white !text-black !py-2'
                onClick={() => setIsOpenCatpanelFilter(true)}
              >
                <span className='flex items-center gap-2'>
                  <RiMenu2Fill /> Filters
                </span>
                <LiaAngleDownSolid />
              </Button>
            )}

            {/* Mobile Filter Drawer */}
            {!isDesktop && (
              <CategoryPanelProduct 
                isOpenCatpanelFilter={isOpenCatpanelFilter} 
                setIsOpenCatpanelFilter={setIsOpenCatpanelFilter}
              />
            )}
          </div>

          {/* --- Right Content (Product Grid) --- */}
          <div className='w-full md:w-[75%] lg:w-[80%]'>
            
            {/* Toolbar */}
            <div className='bg-white p-3 rounded-lg shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4'>
              
              {/* Left: View Toggle */}
              <div className="flex items-center gap-2">
                <Tooltip title="List View">
                  <Button 
                    onClick={() => setViewMode('list')}
                    className={`!min-w-[40px] !w-[40px] !h-[40px] !rounded-full ${viewMode === 'list' ? '!bg-red-500 !text-white' : '!bg-gray-100 !text-black'}`}
                  >
                    <LuMenu />
                  </Button>
                </Tooltip>
                
                <Tooltip title="Grid View">
                  <Button 
                    onClick={() => setViewMode('grid')}
                    className={`!min-w-[40px] !w-[40px] !h-[40px] !rounded-full ${viewMode === 'grid' ? '!bg-red-500 !text-white' : '!bg-gray-100 !text-black'}`}
                  >
                    <IoGridSharp />
                  </Button>
                </Tooltip>
                
                <span className='text-sm text-gray-500 ml-2 hidden sm:block'>
                  Showing {paginatedProducts.length} of {filteredProducts.length} products
                </span>
              </div>

              {/* Right: Sort By */}
              <div className="flex items-center gap-2 ml-auto">
                <span className='text-sm text-gray-500'>Sort By:</span>
                <Button
                  onClick={handleSortClick}
                  endIcon={<LiaAngleDownSolid />}
                  className='!text-black !text-sm !font-medium !capitalize'
                >
                  {sortBy}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openSortMenu}
                  onClose={() => handleSortClose(null)}
                >
                  {["Relevance", "A to Z", "Z to A", "Low to High", "High to Low"].map((option) => (
                    <MenuItem key={option} onClick={() => handleSortClose(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, index) => {
                   // Common Props
                   const productProps = {
                     key: product._id || index,
                     index: index,
                     productID: product._id,
                     productName: product.productName,
                     productPrice: product.productPrice,
                     productDescription: product.productDescription,
                     productImage: product.productImage,
                     productRating: product.productRating,
                     setOpenProductDetailsModel: setOpenProductDetailsModel
                   };

                   return viewMode === 'grid' 
                     ? <Productitem {...productProps} /> 
                     : <ProductitemListView {...productProps} />;
                })
              ) : (
                <div className="col-span-full py-10 text-center text-gray-500">
                   <Typography variant="h6">No products found.</Typography>
                </div>
              )}
            </div>

            {/* Pagination */}
            {count > 1 && (
              <div className='flex justify-center mt-10'>
                <Pagination 
                  count={count} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                  shape="rounded"
                  showFirstButton 
                  showLastButton 
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Product Details Modal */}
      <Dialog
        open={openProductDetailsModel}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={() => setOpenProductDetailsModel(false)}
        classes={{ paper: 'rounded-xl overflow-hidden' }}
      >
        <DialogContent className='relative p-0'>
          <Button 
            className='!absolute top-4 right-4 !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !bg-gray-100 !text-black z-10'
            onClick={() => setOpenProductDetailsModel(false)}
          >
            <IoCloseSharp size={20} />
          </Button>
          
          <div className="p-6">
             <FilterProductDetail filteredProducts={filteredProducts} />
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ProductListing;