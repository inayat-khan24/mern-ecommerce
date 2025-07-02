import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BsFillBagCheckFill } from "react-icons/bs";
import CartPanelIItems from '../component/CartPanelIItems';
import { ThemeContext } from '../store/create';

const CheckOut = () => {
  const { cartItems, DeleteItems ,allPrince} = useContext(ThemeContext);
  const cartList = cartItems.cartItems || []
  console.log(cartItems)
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    contactEmail: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Details:', user);
    // Submit the data to your server or state manager
  };

  return (
    <section className='py-10'>
      <div className="container flex flex-col lg:flex-row gap-5">
        {/* Left Column */}
        <div className="leftCol w-full lg:w-[70%]">
          <div className="card bg-white shadow-md p-5 rounded-md w-full">
            <h1 className="text-xl font-semibold mb-4">Billing Details</h1>

            <form className="w-full mt-5" onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div className='flex flex-wrap gap-5 pb-5'>
                <div className='col w-full md:w-[48%]'>
                  <TextField
                    className='w-full'
                    label="Full Name"
                    variant="outlined"
                    size='small'
                    name='fullName'
                    value={user.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col w-full md:w-[48%]'>
                  <TextField
                    type='email'
                    className='w-full'
                    label="Email"
                    variant="outlined"
                    size='small'
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Street address */}
              <h6 className='text-[14px] font-medium mb-2'>Street address *</h6>
              <div className='pb-5'>
                <TextField
                  className='w-full'
                  label="House No. and Street Name"
                  variant="outlined"
                  size='small'
                  name='streetAddress'
                  value={user.streetAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='pb-5'>
                <TextField
                  className='w-full'
                  label="Apartment, Suite, unit, etc. (optional)"
                  variant="outlined"
                  size='small'
                  name='apartment'
                  value={user.apartment}
                  onChange={handleChange}
                />
              </div>

              {/* City & State */}
              <div className='flex flex-wrap gap-5 pb-5'>
                <div className='col w-full md:w-[48%]'>
                  <TextField
                    className='w-full'
                    label="Town / City *"
                    variant="outlined"
                    size='small'
                    name='city'
                    value={user.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col w-full md:w-[48%]'>
                  <TextField
                    className='w-full'
                    label="State / Country"
                    variant="outlined"
                    size='small'
                    name='state'
                    value={user.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* ZIP */}
              <h6 className='text-[14px] font-medium mb-2'>Postcode / ZIP *</h6>
              <div className='pb-5'>
                <TextField
                  className='w-full'
                  label="Zip Code"
                  variant="outlined"
                  size='small'
                  name='zip'
                  value={user.zip}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Contact */}
              <div className='flex flex-wrap gap-5 pb-5'>
                <div className='col w-full md:w-[48%]'>
                  <TextField
                    className='w-full'
                    label="Phone Number *"
                    variant="outlined"
                    size='small'
                    name='phone'
                    value={user.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col w-full md:w-[48%]'>
                  <TextField
                    className='w-full'
                    label="Email Address"
                    variant="outlined"
                    size='small'
                    name='contactEmail'
                    value={user.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button variant='contained' color='primary' type='submit'>
                Submit
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="rightCol w-full lg:w-[30%] mt-5 lg:mt-0">
          <div className="card shadow-md bg-white p-5 rounded-md">
            <h2 className='text-lg font-semibold mb-4'>Your Order</h2>

            <div className='flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]'>
              <span className='text-[14px] font-semibold'>Product : {cartItems.length} </span>
              <span className='text-[14px] font-semibold'>Subtotal:{cartItems.totalPrice}</span>
            </div>

            <div className="scroll mb-5 max-h-[250px] overflow-y-scroll pr-2">
              {cartList.map((cartProduct, index) => {
                const {
                  _id,
                  productDescription,
                  productImage,
                  productName,
                  productPrice,
                  quantity,
                  total

                } = cartProduct;
                console.log(cartProduct)
                return (
                  <CartPanelIItems
                    key={index}
                    index={index}
                    _id={productPrice}
                    productDescription={productDescription}
                    productImage={productImage}
                    productName={productName}
                    productPrice={productPrice}
                    quantity={quantity}
                    total = {total}

                    
                  />
                );
              })}
            </div>

            <Button
              className='w-full flex items-center gap-2 btn-org btn-lg'
              variant='contained'
              color='primary'
            >
              <BsFillBagCheckFill className='text-[20px]' /> CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
