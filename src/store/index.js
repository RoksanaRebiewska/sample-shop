import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart-slice';
import cartPopupSlice from './cartPopup-slice';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartPopup: cartPopupSlice.reducer,
  },
});

export default store;
