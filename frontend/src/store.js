import { configureStore } from "@reduxjs/toolkit";

import allProductsReducer from "./features/Products/allProductsSlice";

const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
  },
});

export default store;
