import React, { useContext } from 'react';
import { useMediaQuery, Button } from '@mui/material';
import { FaShippingFast, FaHeadset, FaExchangeAlt, FaArrowRight } from "react-icons/fa";
import { MdPayment, MdDiscount } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";

// Components
import HomeSlider from '../component/HomeSlider';
import ProductsSlider from '../component/ProductsSlider';
import Navigation from '../component/Navigation';
import { ThemeContext } from '../store/create';

const Home = () => {
  const { isLoading } = useContext(ThemeContext);
  
  // Responsive Breakpoints
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');
  const isLargeScreen = useMediaQuery('(max-width:1200px)');
  
  // Dynamic Slider Items Count
  const slidesCount = isSmallScreen ? 2 : isMediumScreen ? 3 : isLargeScreen ? 4 : 5;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#f4f5f7]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-[#ff5252] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 font-medium">Loading store...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f4f5f7] min-h-screen pb-10">
      
      {/* --- Sticky Navigation --- */}
      <section className="bg-white shadow-sm sticky top-[70px] z-40">
        <Navigation />
      </section>

      <div className="container mx-auto px-4 lg:px-6">
        
        {/* --- 1. Hero Slider --- */}
        <section className="mt-6 rounded-2xl overflow-hidden shadow-md">
          <HomeSlider />
        </section>

        {/* --- 2. Service Features Strip --- */}
        <section className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-wrap justify-between gap-6 items-center">
             {[
               { icon: <FaShippingFast />, title: "Free Shipping", sub: "Orders over $100" },
               { icon: <FaExchangeAlt />, title: "30 Days Return", sub: "Easy returns" },
               { icon: <MdPayment />, title: "Secure Payment", sub: "100% Protected" },
               { icon: <MdDiscount />, title: "Best Price", sub: "Guaranteed" },
               { icon: <FaHeadset />, title: "24/7 Support", sub: "Dedicated help" },
             ].map((item, index) => (
               <div key={index} className="flex items-center gap-4 w-full sm:w-[45%] lg:w-auto group cursor-default">
                  <div className="text-3xl text-gray-300 group-hover:text-[#ff5252] transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm uppercase">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* --- 3. Best Selling Products --- */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Best Selling Products</h2>
              <p className="text-sm text-gray-500 mt-1">Don't miss this opportunity at a special price.</p>
            </div>
            <Button className="!text-[#ff5252] !font-semibold !capitalize hover:!bg-red-50">
              View All <FaArrowRight className="ml-2 text-xs"/>
            </Button>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <ProductsSlider items={slidesCount} />
          </div>
        </section>

        {/* --- 4. Promotional Banners (NEW) --- */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000", title: "Sport Shoes", discount: "Min 50% Off" },
            { img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000", title: "Smart Phones", discount: "New Arrivals" },
            { img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000", title: "Accessories", discount: "Up to 30% Off" }
          ].map((banner, i) => (
            <div key={i} className="relative h-[200px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
              <img 
                src={banner.img} 
                alt={banner.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white">
                <span className="bg-[#ff5252] text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                  {banner.discount}
                </span>
                <h3 className="text-2xl font-bold mt-2 drop-shadow-md">{banner.title}</h3>
                <button className="text-xs font-semibold underline mt-2 hover:text-[#ff5252] transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* --- 5. Electronics Slider --- */}
        <section className="mt-10">
           <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Best of Electronics</h2>
              <p className="text-sm text-gray-500 mt-1">Latest gadgets & accessories.</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <ProductsSlider items={slidesCount} />
          </div>
        </section>

        {/* --- 6. Newsletter Section (NEW) --- */}
        <section className="mt-16 mb-6">
          <div className="bg-[#233a95] rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
            {/* Decoration Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#ff5252]/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
            
            <div className="relative z-10 w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Sign up for Newsletter</h2>
              <p className="text-blue-100 text-sm">
                ...and receive <span className="font-bold text-[#ff5252]">$20 coupon</span> for first shopping.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-1/2">
              <div className="bg-white p-2 rounded-full flex shadow-lg max-w-md mx-auto md:ml-auto">
                <IoMailOutline className="text-2xl text-gray-400 ml-3 self-center"/>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-4 py-2 outline-none text-gray-700 bg-transparent"
                />
                <Button className="!bg-[#ff5252] !text-white !rounded-full !px-8 !capitalize !font-bold hover:!bg-red-600 transition-all">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;