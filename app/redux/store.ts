import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/slices/productsSlice";
import cartReducer from "../redux/slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,  
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
