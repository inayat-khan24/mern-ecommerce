import React, { useState } from 'react'

import  Button  from '@mui/material/Button';
import QtyBox from '../component/QtyBox';

const Verify = () => {
  const [otp,setotp] = useState("")
  const userEmail = localStorage.getItem("email")
  const handleOtpChange =(value)=>{
    setotp(value);
  };

  const verifyOTP =(e)=>{
    e.preventDefault()
    alert(otp)
  }
  return (
      <section className='section py-10'>
          <div className='container'>
            <div className='card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10'>
              <div className='text-center flex items-center justify-center'>
                <img src="./verify3.png" alt="" width="80" />

              </div>
                <h3 className='text-center text-[18px] text-black mt-4 mb-1'>Verify OTP</h3>
                <p className='text-center mt-0 mb-4'>OTP send to <span className='text-[#ff5252] font-bold'>{userEmail}</span></p>
               
                    <form action="" onSubmit={verifyOTP}>
                    <QtyBox   length={4} onChange={handleOtpChange} />

                    <div className='flex items-center justify-center mt-5 px-3'>
                      <Button type='submit' className="w-full btn-org btn-lg">Verify OTP</Button>

                    </div>

                    </form>
    
            </div>
    
    
    
            </div>      
        </section>
  )
}

export default Verify
