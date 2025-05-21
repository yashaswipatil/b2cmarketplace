import { createSlice } from '@reduxjs/toolkit';


const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('cartItems');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Cannot parse cart from localStorage:', err);
    return [];
  }
};


const initialState = {
  cartItems: loadCartFromLocalStorage(),   // 👈 hydrate from localStorage
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.cartItems.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
