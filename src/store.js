import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../src/Components/redux/CartSlice';
import productsReducer from '../src/Components/redux/ProductSlice';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

// Load persisted state
const persistedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: {
    cart: persistedState,
  },
});

store.subscribe(() => {
  saveState(store.getState().cart);
});

export default store;
