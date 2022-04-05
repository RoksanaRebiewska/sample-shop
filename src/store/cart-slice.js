import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0, toBeAdded: 0 },
  reducers: {
    addOne(state) {
      state.toBeAdded += 1;
    },
    removeOne(state) {
      if (state.toBeAdded === 0) {
        return;
      }
      state.toBeAdded -= 1;
    },
    addToCart(state, action) {
      if (state.toBeAdded === 0) {
        return;
      }

      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: newItem.totalToBeAdded,
          image: newItem.image,
        });
        state.totalQuantity += 1;
      } else {
        existingItem.quantity += newItem.totalToBeAdded;
      }

      state.toBeAdded = 0;
    },
    removeFromCart(state, action) {
      const itemToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemToRemove);
      state.totalQuantity -= 1;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
