import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
};

const allProductsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    loadingProducts(state, action) {
      state.isLoading = true;
    },
    getProducts(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
  },
});

console.log("ALL PRODUCTS SLICE:", allProductsSlice);
export const { loadingProducts } = allProductsSlice.actions;

// Custom Async Action Creator
export function getProducts() {
  return async function (dispatch, getState) {
    dispatch({ type: "products/loadingProducts" });

    const { data } = await axios.get("http://127.0.0.1:8000/api/products");

    console.log("ASYNC PRODUCTS:", data);

    dispatch({ type: "products/getProducts", payload: data });
  };
}

export default allProductsSlice.reducer;
