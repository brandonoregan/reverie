import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  isLoading: false,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    loadingProduct(state, action) {
      state.isLoading = true;
    },
    getProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export function getProduct(id) {
  return async function (dispatch, getState) {
    dispatch({ type: "productDetail/loadingProduct" });

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/products/${id}`
    );

    console.log("ASYNC SINGLE PRODUCT:", data);

    dispatch({ type: "productDetail/getProduct", payload: data });
  };
}

export const { loadingProduct } = productDetailSlice.actions;

export default productDetailSlice.reducer;
