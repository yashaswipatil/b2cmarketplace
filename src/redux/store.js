import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});


store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
});

export default store;
