// In your Products component file
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortProducts } from '../Components/redux/ProductSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const [sort, setSort] = useState('');

  const handleSortChange = (sortValue) => {
    setSort(sortValue);
    dispatch(sortProducts({ sortBy: sortValue }));
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading products.</p>;

  return (
    <div className="flex">
      <div className="w-[820px] ml-[100px] mt-[10px] p-4 bg-white shadow-md">
        <h2 className="font-semibold text-gray-700 mb-4 text-[13px] text-start">Sort By</h2>
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="price_high_to_low">Price: High to Low</option>
          <option value="price_low_to_high">Price: Low to High</option>
          <option value="rating_high_to_low">Rating: High to Low</option>
        </select>
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="p-4 border rounded shadow-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover mb-2"
                />
                <h2 className="text-lg font-bold mb-2  h-28">{product.title}</h2>
                <p className="text-gray-500">{product.price} Rs</p>
                <p className="text-yellow-500">{product.rating.rate} ★</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
