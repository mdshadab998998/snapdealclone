// In your redux ProductSlice file
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Existing async thunks
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});

export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (category) => {
  const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  return response.data;
});

// New async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    allProducts: [], // To store all products for search filtering
    categories: [],
    status: null,
  },
  reducers: {
    sortProducts: (state, action) => {
      const { sortBy } = action.payload;
      if (sortBy === 'price_high_to_low') {
        state.items.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'price_low_to_high') {
        state.items.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'rating_high_to_low') {
        state.items.sort((a, b) => b.rating.rate - a.rating.rate);
      }
    },
    searchProducts: (state, action) => {
      const query = action.payload.toLowerCase();
      state.items = state.allProducts.filter(product =>
        product.title.toLowerCase().includes(query)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProducts = action.payload;
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { sortProducts, searchProducts } = productsSlice.actions;

export default productsSlice.reducer;
