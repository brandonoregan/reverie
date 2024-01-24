import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  isLoading: false,
  error: null,
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
    productDetailError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export function getProduct(id) {
  return async function (dispatch, getState) {
    dispatch(loadingProduct());

    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/products/${id}`
      );

      console.log("ASYNC SINGLE PRODUCT:", data);

      dispatch({ type: "productDetail/getProduct", payload: data });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: "productDetail/productDetailError",
        payload: errorMessage,
      });
    }
  };
}

export const { loadingProduct, productDetailError } =
  productDetailSlice.actions;

export default productDetailSlice.reducer;

// JONAS WAY OF DISPATCHING FROM AN OVERWRITTEN ACTION CREATOR
// export function getProduct(id) {
//   return async function (dispatch, getState) {
//     dispatch({ type: "productDetail/loadingProduct" });

//     const { data } = await axios.get(
//       `http://127.0.0.1:8000/api/products/${id}`
//     );

//     console.log("ASYNC SINGLE PRODUCT:", data);

//     dispatch({ type: "productDetail/getProduct", payload: data });
//   };
// }
