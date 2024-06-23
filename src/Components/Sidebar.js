import React, { useEffect } from 'react';
// import { SearchIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories,fetchProductsByCategory } from './redux/ProductSlice';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])
  const handleCategoryClick = (category) => {
    dispatch(fetchProductsByCategory(category));
  };
  return (
    <div className="w-[220px] ml-[100px] mt-[10px] p-4 bg-white shadow-md cursor-pointer">
      {/* Top Categories */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-700 mb-3 text-[13px] text-start">TOP CATEGORIES</h2>
        <ul className="space-y-4">
          {[
            { name: "Men's Fashion", img: 'https://n1.sdlcdn.com/imgs/k/v/x/Men_sitenavigation-b972a.jpg',categories:"men's clothing" },
            { name: "Women's Fashion", img: 'https://n1.sdlcdn.com/imgs/k/v/x/WoMen_sitenav-5a8ca.jpg',categories:"women's clothing" },
            { name: 'Home & Kitchen', img: 'https://n1.sdlcdn.com/imgs/k/v/x/HOme_sitenavigation-d7a00.jpg',categories:"electronics" },
            { name: "Toys, Kids' Fashion & more", img: 'https://n4.sdlcdn.com/imgs/k/v/x/Toys_Sitenavigation-ef666.jpg',categories:"jewelery" },
            { name: 'Beauty, Health & Daily ...', img: 'https://n2.sdlcdn.com/imgs/k/v/x/Beauty_Site_navigation-5f3be.jpg',categories:"jewelery" },
          ].map((category) => (
            <Link to={"/products"} key={category.name} className="flex items-center h-6" onClick={() => handleCategoryClick(category.categories) }>
              <img src={category.img} alt={category.name} className="w-7 h-8 rounded-full mr-3" />
              <span className="text-gray-700 text-[12px] text-start">{category.name}</span>
            </Link>
          ))}
        </ul>
      </div>

      {/* More Categories */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-700 mb-4 text-[13px] text-start">MORE CATEGORIES</h2>
        <div className="space-y-2  flex flex-col">
          {
            
          categories.map((category) => (
            <Link to={"/products"} key={category}  onClick={() => handleCategoryClick(category)} className="text-gray-700 hover:underline text-[12px] text-start">{category}</Link>
          ))}
        </div>
      </div>

      {/* Trending Searches */}
      <div>
        <h2 className="font-semibold text-gray-700 mb-4 text-start text-[13px]">TRENDING SEARCHES</h2>
        <ul className="space-y-2">
          {[
            'Kitchen Product',
            'Shoes For Men',
            'Kurti Set',
            'Sandal Men',
            'Sport Shoe Men',
          ].map((search) => (
            <li key={search} className="flex items-center text-gray-700 hover:underline text-[12px]">
              {/* <SearchIcon className="w-5 h-5 mr-2" /> */}
              <svg className='w-3 h-3 mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
