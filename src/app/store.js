import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import categorySlice from "../features/categorySlice";
import cartSlice from "../features/cartSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    products: productSlice,
    categories: categorySlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
});

export default store;
