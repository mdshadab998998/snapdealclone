import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../Components/redux/CartSlice'; // Adjust path as necessary
import { useAuth } from '../Components/Auth/Authprovider'; // Import useAuth hook

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(id))
  );
  const { user } = useAuth(); // Access user object from useAuth hook

  if (!product) return <p>Product not found.</p>;

  const handleAddToCart = () => {
    if (user) {
      // If user is logged in, dispatch addToCart and redirect to cart
      console.log('Dispatching addToCart with product:', product);
      dispatch(addToCart(product));
      navigate('/cart'); // Redirect to cart page
    } else {
      // If user is not logged in, redirect to login page
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-8">
      <div className="flex-1 flex flex-row-reverse gap-10">
        <img src={product.image} alt={product.title} className="w-[600px] h-[400px] object-cover" />
        <div className="flex mt-2 flex-col items-center justify-center gap-2">
          {[1, 2, 3, 4].map((img, index) => (
            <img key={index} src={product.image} alt={product.title} className="w-20 h-20 object-cover" />
          ))}
        </div>
      </div>
      <div className="flex-1 ml-8">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-xl text-gray-700 mb-4">{product.price} Rs</p>
        <p className="text-yellow-500 text-xl mb-4">{product.rating.rate} ★</p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddToCart}>Add to Cart</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
