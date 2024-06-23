import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllProducts, searchProducts } from '../Components/redux/ProductSlice'; // adjust the path as needed
import { useAuth } from './Auth/Authprovider';
import { signOut } from 'firebase/auth';
import { auth } from '../Components/Auth/firebase'; // Adjust the path to your firebase.js

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showsign, setShowSign] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products when the component mounts
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
      navigate('/products');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      dispatch(searchProducts(value));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error.message);
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-[#c6003d] text-white text-xs py-1 px-[120px]">
        <div className="container mx-auto flex justify-between">
          <div>Brand Waali Quality, Bazaar Waali Deal!</div>
          <div className="flex space-x-4">
            <a href="/" className="hover:underline">Impact@Snapdeal</a>
            <a href="/" className="hover:underline">Help Center</a>
            <a href="/" className="hover:underline">Sell On Snapdeal</a>
            <a href="/" className="hover:underline">Download App</a>
            <a href="/" className="hover:underline">Donate For Elderly</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#e40046] py-3 px-[100px]">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg"
              alt="Snapdeal"
              className="w-30 h-auto"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-grow mr-[250px] ml-[150px] relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products & brands"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-gray-800 text-white rounded"
              >
                Search
              </button>
            </form>
          </div>

          {/* Icons */}
          <div className="flex space-x-4">
            <a href="/cart" className="flex items-center text-white hover:underline">
              <svg className="w-6 h-6" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="cart"><path d="M27.47,23.93H14.92A5.09,5.09,0,0,1,10,20L8,11.87a5.11,5.11,0,0,1,5-6.32h16.5a5.11,5.11,0,0,1,5,6.32l-2,8.15A5.1,5.1,0,0,1,27.47,23.93ZM12.94,8.05a2.62,2.62,0,0,0-2.54,3.23l2,8.15a2.6,2.6,0,0,0,2.54,2H27.47a2.6,2.6,0,0,0,2.54-2l2-8.15a2.61,2.61,0,0,0-2.54-3.23Z"></path><path d="M9.46 14a1.25 1.25 0 0 1-1.21-1L6.46 5.23A3.21 3.21 0 0 0 3.32 2.75H1.69a1.25 1.25 0 0 1 0-2.5H3.32A5.71 5.71 0 0 1 8.9 4.66l1.78 7.77a1.24 1.24 0 0 1-.93 1.5A1.43 1.43 0 0 1 9.46 14zM15.11 34.75a4 4 0 1 1 4-4A4 4 0 0 1 15.11 34.75zm0-5.54a1.52 1.52 0 1 0 1.52 1.52A1.52 1.52 0 0 0 15.11 29.21zM28.93 34.75a4 4 0 1 1 4-4A4 4 0 0 1 28.93 34.75zm0-5.54a1.52 1.52 0 1 0 1.53 1.52A1.52 1.52 0 0 0 28.93 29.21zM33.75 14H31a1.25 1.25 0 0 1 0-2.5h2.76a1.25 1.25 0 0 1 0 2.5zM2.22 14H.69a1.25 1.25 0 0 1 0-2.5H2.22a1.25 1.25 0 0 1 0 2.5zM31.1 7.52a1.24 1.24 0 0 1-1.2-1c-.21-.89-.45-1.83-.68-2.75A1.25 1.25 0 0 1 29 2.22a1.26 1.26 0 0 1 1.54.88c.24.92.48 1.86.69 2.75a1.25 1.25 0 0 1-.9 1.5A1.45 1.45 0 0 1 31.1 7.52zM33.75 21.53H29a1.25 1.25 0 0 1 0-2.5h4.77a1.25 1.25 0 0 1 0 2.5zM6.69 21.53H2.22a1.25 1.25 0 0 1 0-2.5H6.69a1.25 1.25 0 0 1 0 2.5zM29.82 7.78H13.32a1.25 1.25 0 0 1 0-2.5H29.82a1.25 1.25 0 0 1 0 2.5z"></path></svg>
              <span className="ml-1">Cart</span>
            </a>
            <div
              className="relative"
              onMouseEnter={() => setShowSign(true)}
              onMouseLeave={() => setShowSign(false)}
            >
              <span className="flex items-center text-white cursor-pointer">
                <svg className="w-6 h-6" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="user"><path d="M16 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                {user === null ? (
                  <Link className="ml-1" to={"/login"}>Sign In</Link>
                ) : (
                  <span>{console.log(user)}{user.displayName || user.email || user.phoneNumber}</span> // Ensure this doesn't throw an error
                )}
              </span>
              {showsign && (
                <span onMouseEnter={() => setShowSign(true)} onMouseLeave={() => setShowSign(false)}>
                  {user === null ? (
                    <span></span>
                  ) : (
                    <span className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                      <Link to={"/profile"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Your Account</Link>
                      <Link to={"/order"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Your Orders</Link>
                      <Link to={"/wishlist"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Shortlist</Link>
                      <Link to={"/giftcard"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Gift Cards</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
