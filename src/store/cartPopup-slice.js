import { createSlice } from '@reduxjs/toolkit';

const cartPopupSlice = createSlice({
  name: 'cart-popup',
  initialState: { cartVisible: false },
  reducers: {
    setCartVisible(state) {
      state.cartVisible = !state.cartVisible;
    },
  },
});

export const cartPopupActions = cartPopupSlice.actions;

export default cartPopupSlice;
