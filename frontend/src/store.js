import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./features/Products/productsSlice";
import productDetailReducer from "./features/Products/productDetailSlice";
import cartReducer from "./features/Cart/cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
  },
});

export default store;
