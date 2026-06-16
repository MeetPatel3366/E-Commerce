import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Types/productTypes";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.id == action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id == action.payload);

      if (item) {
        item.quantity++;
      }
    },

    decreseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id == action.payload);

      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
