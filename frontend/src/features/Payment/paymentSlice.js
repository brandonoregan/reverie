import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

const initialState = {
  isLoading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    loading(state, actions) {
      state.isLoading = true;
    },
    checkout(state, actions) {
      state.isLoading = false;
    },
  },
});

export function checkout() {
  return async function (dispatch, getState) {
    dispatch(loading());
    const currentState = getState();
    const cartItems = currentState.cart.cartItems;

    try {
      const { data } = await axiosInstance.post("stripe/", cartItems);

      console.log("DATA: ", data);
      console.log("CART ITEMS: ", cartItems);

      dispatch({ type: "payment/checkout", payload: data });

      dispatch(checkout());

      const checkoutUrl = data.url;
      return checkoutUrl; // Return the URL
    } catch (error) {
      console.log("CHECKOUT ERROR: ", error);
    }
  };
}

export default paymentSlice.reducer;

export const { loading } = paymentSlice.actions;
