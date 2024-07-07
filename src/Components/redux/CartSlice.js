import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setCartItems, setStatus } = cartSlice.actions;

export const fetchCartItems = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get('https://snapdealbakend.onrender.com/api/cart');
    dispatch(setCartItems(response.data));
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};

export const addToCart = (item) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.post('https://snapdealbakend.onrender.com/api/cart', item);
    dispatch(fetchCartItems());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};

export const updateCartItem = (id, item) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    await axios.put(`https://snapdealbakend.onrender.com/api/cart/${id}`, item);
    dispatch(fetchCartItems());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    await axios.delete(`https://snapdealbakend.onrender.com/api/cart/${id}`);
    dispatch(fetchCartItems());
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};

export default cartSlice.reducer;
