import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    loadingProducts(state, action) {
      state.isLoading = true;
    },
    getProducts(state, action) {
      state.allProducts = action.payload;
      state.isLoading = false;
    },
    productsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// console.log("ALL PRODUCTS SLICE:", productsSlice);

// Custom Async Action Creator
export function getProducts() {
  return async function (dispatch, getState) {
    dispatch(loadingProducts());

    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/products/");

      // console.log("ASYNC PRODUCTS:", data);

      dispatch({ type: "products/getProducts", payload: data });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: "products/productsError", payload: errorMessage });
    }
  };
}

export default productsSlice.reducer;

export const { loadingProducts, productsError } = productsSlice.actions;
