import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TrendingProductsBanner from './TrendingProduct';
import { fetchProductsByCategory } from './redux/ProductSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
};

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    dispatch(fetchProductsByCategory(category));
  };

  const banners = [
    {
      image: 'https://n3.sdlcdn.com/imgs/k/s/i/cookware-bc6ef.jpg',
      title: 'KITCHENWARE',
      category:"electronics"
    },
    {
      image: 'https://n1.sdlcdn.com/imgs/k/s/i/sport_shoe-6f9df.jpg',
      title: 'SPORTS FASHION',
      category:"men's clothing"

    },
    {
      image: 'https://n2.sdlcdn.com/imgs/k/v/r/web_home_903_new_12-13ad3.jpg',
      title: 'BOB CARD',
      category:"women's clothing"

    },
    {
      image: 'https://n2.sdlcdn.com/imgs/k/s/i/ethnicwear-ef4d9.jpg',
      title: 'ETHINIC WEAR',
      category:"jewelery"

    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="relative w-[1000px]">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative">
          <Link to={"/products"}>
            <img onClick={()=>{handleCategoryClick(banner.category)}} src={banner.image} alt={banner.title} className="w-full h-auto" />
            </Link>
          </div>
        ))}
      </Slider>
      <div className="flex justify-around mt-4">
        {banners.map((banner, index) => (
          <div key={index} className={`text-center ${currentSlide === index ? 'border-b-2 border-black' : ''}`}>
            <p className="cursor-pointer">{banner.title}</p>
          </div>
        ))}
      </div>
      <TrendingProductsBanner />
    </div>
  );
};

export default BannerCarousel;
