import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./features/Products/productsSlice";
import productDetailReducer from "./features/Products/productDetailSlice";
import cartReducer from "./features/Cart/cartSlice";
import authReducer from "./features/Auth/authSlice";
import paymentReducer from "./features/Payment/paymentSlice";
import orderReducer from "./features/Order/orderSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    auth: authReducer,
    payment: paymentReducer,
    order: orderReducer,
  },
});

export default store;
