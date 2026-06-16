import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import favouriteReducer from "../features/favouriteSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
