// src/components/LoginPage.js
import React from 'react';
import 'tailwindcss/tailwind.css';
import PhoneAuth from './Auth/Phoneauth';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl relative h-[450px]">
        {/* Left Side */}
        <div className="w-[40%] bg-gray-100 p-8 flex flex-col justify-center items-start relative">
          <div className="mb-8 flex">
            <img src="/image_no_bg.png" alt="Manage your orders" className="mb-4" />
            <div className='text-[12px]'>
            <h3 className="font-[600] ">MANAGE YOUR ORDERS</h3>
            <p>Track orders, manage cancellations & returns.</p>
            </div>
          </div>
          <div className='flex'>
            <img src="/image_no_bg2.png" alt="Awesome offers updates for you" className="mb-4" />
            <div className='text-[12px]'>
            <h3 className="font-[600]">AWESOME OFFERS UPDATES FOR YOU</h3>
            <p>Be first to know about great offers and save.</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-8 flex flex-col justify-center relative z-10 bg-white">
          <h2 className="text-xl font-[400] mb-4">Login/Sign Up On Snapdeal</h2>
          <p className="mb-4  text-xs">Please provide your Mobile Number or Email to Login/Sign Up on Snapdeal</p>
          <PhoneAuth />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
