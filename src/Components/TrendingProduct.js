import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TrendingProductsBanner = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data.slice(0, 5)); // Get the first 5 products
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };

    fetchTrendingProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="p-2" onClick={() => handleProductClick(product.id)}>
            <div className="border rounded-lg overflow-hidden cursor-pointer">
              <img src={product.image} alt={product.title} className="w-full h-[250px]" />
              <div className="p-2 h-[150px]">
                <h3 className="text-sm font-semibold">{product.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500 line-through">{`$${(product.price * 1.5).toFixed(2)}`}</span>
                  <span className="text-red-500 font-semibold">{`$${product.price}`}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-green-500">{`${Math.floor(Math.random() * 70 + 10)}% OFF`}</span>
                  <span className="text-yellow-500">{`${product.rating.rate} ★`}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

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

export default TrendingProductsBanner;
