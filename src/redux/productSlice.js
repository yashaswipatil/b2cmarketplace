// src/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch products and filter by searchTerm client-side
export const fetchSearchResults = createAsyncThunk(
  'products/fetchSearchResults',
  async (searchTerm) => {
    // Fetch all products from fakestoreapi
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    // Filter products locally by title if searchTerm exists
    if (searchTerm) {
      return data.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data; // Return all if no searchTerm
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    searchTerm: '',
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchTerm, clearSearchResults } = productsSlice.actions;
export default productsSlice.reducer;
