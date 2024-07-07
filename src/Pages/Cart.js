import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, removeFromCart, updateCartItem } from '../Components/redux/CartSlice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    dispatch(updateCartItem(itemId, { quantity: newQuantity }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page p-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className='text-center'>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center border p-4 rounded-lg shadow-sm">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-gray-700 mt-2">Price: Rs. {item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove
                  </button>
                  <input
                    type="number"
                    className="border px-2 py-1 rounded w-20"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end items-center space-x-4 mt-6">
            <p className="text-xl font-bold">You Pay: Rs. {total}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
