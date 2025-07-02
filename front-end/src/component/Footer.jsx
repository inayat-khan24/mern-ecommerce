import React from 'react';
import { LiaShippingFastSolid, LiaGiftSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline, IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
// import Drawer from '@mui/material/Drawer';
// import CartPanel from '../CartPanel/CartPanel'
// import { MyContext } from '../../App';

const Footer = () => {
  // const context = useContext(MyContext)

  return (
    <>
      <footer className='py-6 flex justify-center w-full bg-white'>
        <div className="container w-full px-4">

          {/* Feature Icons Row */}
          <div className='flex max-sm:grid max-sm:grid-cols-3 justify-center gap-6 pb-8'>
            {[
              { icon: <LiaShippingFastSolid />, title: "Free Shipping", desc: "For all Orders Over $100" },
              { icon: <PiKeyReturnLight />, title: "30 Days Returns", desc: "For an Exchange Product" },
              { icon: <BsWallet2 />, title: "Secured Payment", desc: "Payment Cards Accepted" },
              { icon: <LiaGiftSolid />, title: "Special Gifts", desc: "Our First Product Order" },
              { icon: <BiSupport />, title: "Support 24/7", desc: "Contact us Anytime" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center flex-col group w-[45%] sm:w-[30%] lg:w-[15%] text-center">
                <div className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1'>
                  {item.icon}
                </div>
                <h3 className='text-[16px] font-[600] mt-3'>{item.title}</h3>
                <p className='text-[12px] font-[500]'>{item.desc}</p>
              </div>
            ))}
          </div>

          <hr />

          {/* Main Footer Content */}
    <div
     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 place-items-center">

  {/* Contact Us */}
  <div className="w-full max-w-[320px] border-b sm:border-b-0 sm:border-r border-gray-200 pr-4">
    <h2 className='text-[18px] font-[600] mb-4'>Contact us</h2>
    <p className='text-[13px] font-[400] pb-4'>
      Classyshop - Mega Super Store <br />
      507-Union Trade Centre France
    </p>
    <Link className='link text-[13px]' to="mailto:someone@example.com">
      sales@yourcompany.com
    </Link>
    <span className='text-[25px] font-[600] block w-full mt-3 text-[#ff5252] mb-5'>(+91) 9876-543-210</span>
    <div className='flex items-center gap-2'>
      <IoChatboxOutline className='text-[40px] text-[#ff5252]' />
      <span className='text-[16px] font-[600]'>Online Chat<br />Get Expert Help</span>
    </div>
  </div>

  {/* Product & Company Links */}
  <div className="w-full max-w-[320px] flex flex-wrap">
    <div className="w-full sm:w-1/2 pr-4 mb-6 sm:mb-0">
      <h2 className='text-[18px] font-[600] mb-4'>Products</h2>
      <ul className='grid grid-cols-1 max-sm:grid-cols-2 gap-2'>
        {["Prices drop", "New products", "Best sales", "Contact us", "Sitemap", "Stores"].map((text, i) => (
          <li key={i} className='text-[14px]'><Link to="/" className='link'>{text}</Link></li>
        ))}
      </ul>
    </div>

    <div className="w-full sm:w-1/2">
      <h2 className='text-[18px] font-[600] mb-4'>Our company</h2>
      <ul className='grid grid-cols-1 max-sm:grid-cols-2 gap-2'>
        {["Delivery", "Legal Notice", "Terms and conditions of use", "About us", "Secure payment", "Login"].map((text, i) => (
          <li key={i} className='text-[14px]'><Link to="/" className='link'>{text}</Link></li>
        ))}
      </ul>
    </div>
  </div>

  {/* Newsletter */}
  <div className="w-full max-w-[320px]">
    <h2 className='text-[18px] font-[600] mb-4'>Subscribe to newsletter</h2>
    <p className='text-[13px]'>Subscribe to our latest newsletter to get news about special discounts.</p>
    <form className='mt-5'>
      <input type="text"
        className='w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]'
        placeholder='Your Email Address' />
      <Button className='btn-org w-full mb-2'>SUBSCRIBE</Button>
      <FormControlLabel
        control={<Checkbox />}
        label="I agree to the terms and conditions and the privacy policy"
      />
    </form>
  </div>

</div>

        </div>
      </footer>

      {/* Bottom Bar */}
      <div className='bottomStrip border-t border-[rgba(0,0,0,0.1)] py-3 bg-white'>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          {/* Social Icons */}
          <ul className='flex items-center gap-2'>
            {[FaFacebookF, AiOutlineYoutube, FaPinterestP, FaInstagram].map((Icon, i) => (
              <li key={i} className='list-none'>
                <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all'>
                  <Icon className='text-[15px] group-hover:text-white' />
                </Link>
              </li>
            ))}
          </ul>

          <p className='text-[13px] mb-0'>© 2024 - Ecommerce Template</p>

          {/* Payment Icons */}
          <div className='flex items-center gap-1'>
            {["carte_bleue", "visa", "master_card", "american_express", "paypal"].map((img, i) => (
              <img key={i} src={`/${img}.png`} alt="payment" className='h-[25px]' />
            ))}
          </div>
        </div>
      </div>

      {/* Drawer Example (if needed) */}
      {/*
      <Drawer open={context.openCartPanel} onClose={context.toggleCartPanel(false)} anchor={'right'} className='cartPanel'>
        <div className='flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]'>
          <h4>Shopping Cart (1)</h4>
          <IoCloseSharp className='text-[20px] cursor-pointer' onClick={context.toggleCartPanel(false)} />
        </div>
        <CartPanel />
      </Drawer>
      */}
    </>
  );
};

export default Footer;
