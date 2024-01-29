import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  isLoading: false,
  orderItems: [],
  order: {},
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
    createOrderItems(state, actions) {
      state.orderItems = actions.payload;
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

      const orderItemsArray = cartItems.map((item) => ({
        product: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      dispatch({ type: "payment/checkout", payload: data });

      dispatch(checkout());

      dispatch(createOrderItems(orderItemsArray));

      console.log("ORDER ITEMS ARRAY: ", orderItemsArray);

      const checkout_url = data.checkout_url;
      return checkout_url; // Return the URL
    } catch (error) {
      console.log("CHECKOUT ERROR: ", error);
    }
  };
}

export default paymentSlice.reducer;

export const { loading, createOrderItems } = paymentSlice.actions;
