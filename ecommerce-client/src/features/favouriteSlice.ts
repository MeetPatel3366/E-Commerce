import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Types/productTypes";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: [] as Product[],
  reducers: {
    toggleFavourite: (state, action: PayloadAction<Product>) => {
      const exists = state.find((item) => item.id == action.payload.id);

      if (exists) {
        return state.filter((item) => item.id != action.payload.id);
      }

      state.push(action.payload);
    },
  },
});

export const { toggleFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
