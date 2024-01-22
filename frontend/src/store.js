import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./features/Products/productsSlice";
import productDetailReducer from "./features/Products/productDetailSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
  },
});

export default store;
