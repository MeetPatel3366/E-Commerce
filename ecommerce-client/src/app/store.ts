import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import favouriteReducer from "../features/favouriteSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
