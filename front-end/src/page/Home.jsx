import React, { useContext, useEffect, useState } from 'react'
import HomeSlider from '../component/HomeSlider'
import ProductsSlider from '../component/ProductsSlider'
import { ThemeContext } from '../store/create'
import Navigation from '../component/Navigation'



const Home = () => {
  const {isLoading,cartItems,DeleteItems,userID,token,setCartItems,setWishList}
  = useContext(ThemeContext)



const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [slidBox, setSlidBox] = useState(4);
 

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      if (width <= 375) {
        setSlidBox(2); // Extra small screen
      } else if (width <= 600) {
        setSlidBox(3); // Small screen
      } else {
        setSlidBox(4); // Large screen
      }
    };

    // Initial check
    handleResize();

    // Listen for resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
if (isLoading === true)  return <div>Loading...</div>
  return (
    <div
     className='container   w-[50%] min-w-[100%] bg-[#e7e2e2] pb-2 flex flex-col *
     items-center justify-center
     '>
      
      <section className='mt-2  w-[98%] bg-white'>
        <Navigation />
      </section>
      
<section className='part1 w-[98%] my-2 '>
<HomeSlider/>
</section>

{/* // product slider 1 */}
  <section className='my-2 px-6 w-[98%] bg-white '>
        <div className="container">
   <h1 className='font-[500] text-2xl pt-4'>Latest Best Product</h1>
        <ProductsSlider items={slidBox}/>
 </div>
      </section>
{/* // product slider 2 */}
      <section className='my-2 px-6 w-[98%] bg-white '>
        <div className="container">
   <h1 className='font-[500] text-2xl pt-4'> Best of Electronic </h1>
        <ProductsSlider items={slidBox}/>
 </div>
      </section>
      
    </div>
  )
}

export default Home
