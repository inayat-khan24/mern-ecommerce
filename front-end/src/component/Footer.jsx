import React from 'react';
import { LiaShippingFastSolid, LiaGiftSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className='bg-white border-t border-gray-100 pt-10 pb-4'>
      <div className="container mx-auto px-4 lg:px-8">

        {/* --- 1. Top Features Section --- */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-6 pb-10 border-b border-gray-100'>
          {[
            { icon: <LiaShippingFastSolid />, title: "Free Shipping", desc: "Orders over $100" },
            { icon: <PiKeyReturnLight />, title: "30 Days Return", desc: "If goods have problems" },
            { icon: <BsWallet2 />, title: "Secure Payment", desc: "100% Secure Payment" },
            { icon: <LiaGiftSolid />, title: "Special Gifts", desc: "On first order" },
            { icon: <BiSupport />, title: "24/7 Support", desc: "Dedicated support" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
              <div className='text-4xl text-gray-400 mb-3 transition-transform duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-2'>
                {item.icon}
              </div>
              <h3 className='text-sm font-bold text-gray-800 uppercase tracking-wide'>{item.title}</h3>
              <p className='text-xs text-gray-500 mt-1'>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* --- 2. Main Footer Links --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">

          {/* Column 1: Contact Info */}
          <div className="space-y-4">
            <h2 className='text-lg font-bold text-gray-800 relative inline-block after:content-[""] after:block after:w-10 after:h-[2px] after:bg-[#ff5252] after:mt-1'>
              Contact Us
            </h2>
            <div className='text-sm text-gray-600 space-y-3 pt-2'>
              <p className='flex items-start gap-3'>
                <IoLocationOutline className='text-xl text-[#ff5252] shrink-0' />
                <span>507-Union Trade Centre,<br/> France</span>
              </p>
              <p className='flex items-center gap-3'>
                <IoMailOutline className='text-xl text-[#ff5252] shrink-0' />
                <Link to="mailto:sales@example.com" className='hover:text-[#ff5252] transition-colors'>
                  sales@yourcompany.com
                </Link>
              </p>
              <p className='flex items-center gap-3'>
                <IoChatboxOutline className='text-xl text-[#ff5252] shrink-0' />
                <span className='font-bold text-lg text-gray-800'>(+91) 9876-543-210</span>
              </p>
              <p className='text-xs text-gray-400 pl-8'>Online Chat: Get Expert Help</p>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h2 className='text-lg font-bold text-gray-800 mb-5 relative inline-block after:content-[""] after:block after:w-10 after:h-[2px] after:bg-[#ff5252] after:mt-1'>
              Products
            </h2>
            <ul className='space-y-2'>
              {["Prices drop", "New products", "Best sales", "Contact us", "Sitemap"].map((text, i) => (
                <li key={i}>
                  <Link 
                    to="/" 
                    className='text-sm text-gray-600 hover:text-[#ff5252] hover:pl-2 transition-all duration-300 block'
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h2 className='text-lg font-bold text-gray-800 mb-5 relative inline-block after:content-[""] after:block after:w-10 after:h-[2px] after:bg-[#ff5252] after:mt-1'>
              Our Company
            </h2>
            <ul className='space-y-2'>
              {["Delivery", "Legal Notice", "Terms & Conditions", "About Us", "Secure Payment"].map((text, i) => (
                <li key={i}>
                  <Link 
                    to="/" 
                    className='text-sm text-gray-600 hover:text-[#ff5252] hover:pl-2 transition-all duration-300 block'
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h2 className='text-lg font-bold text-gray-800 mb-5 relative inline-block after:content-[""] after:block after:w-10 after:h-[2px] after:bg-[#ff5252] after:mt-1'>
              Newsletter
            </h2>
            <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
              Subscribe to our latest newsletter to get news about special discounts.
            </p>
            <form className='flex flex-col gap-3'>
              <input 
                type="email"
                className='w-full h-[45px] border border-gray-200 outline-none px-4 rounded-lg focus:border-[#ff5252] transition-colors bg-gray-50 text-sm'
                placeholder='Your Email Address' 
              />
              <Button 
                variant="contained"
                className='!bg-[#ff5252] !text-white !h-[45px] !rounded-lg !capitalize !font-semibold !shadow-none hover:!bg-red-600 hover:!shadow-md transition-all'
              >
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* --- 3. Bottom Strip --- */}
        <div className='border-t border-gray-100 pt-6 pb-2 mt-2'>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Social Icons */}
            <div className='flex items-center gap-3'>
              {[FaFacebookF, AiOutlineYoutube, FaPinterestP, FaInstagram].map((Icon, i) => (
                <Link key={i} to="/" target='_blank' className='w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#ff5252] hover:text-white transition-all duration-300'>
                  <Icon size={14} />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className='text-xs text-gray-500'>
              © {new Date().getFullYear()} - <span className='font-bold text-gray-700'>Ecommerce Template</span>. All rights reserved.
            </p>

            {/* Payment Icons (Placeholders using CSS if images fail) */}
            <div className='flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100'>
              {/* Ensure images exist in public folder or remove this block */}
              {["visa", "master_card", "paypal", "american_express"].map((img, i) => (
                 <img key={i} src={`/${img}.png`} alt={img} className='h-6 object-contain' onError={(e) => e.target.style.display='none'} />
              ))}
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;