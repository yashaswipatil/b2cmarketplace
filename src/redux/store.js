import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
});

export default store;
