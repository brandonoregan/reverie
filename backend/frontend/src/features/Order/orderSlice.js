import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  allOrders: [],
  userOrders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrders(state, action) {
      state.allOrders = action.payload;
    },
    getUserOrders(state, action) {
      state.userOrders = action.payload;
    },
  },
});

export function getOrders() {
  return async function (dispatch, getState) {
    try {
      const { data } = await axiosInstance.get("orders/");

      dispatch({ type: "order/getOrders", payload: data });

      getOrders();
      console.log("ORDERS RES DATA: ", data);
    } catch (error) {
      console.log("ORDERS ERROR: ", error);
    }
  };
}

export function getUserOrders() {
  return async function (dispatch, getState) {
    try {
      const { data } = await axiosInstance.get("user/orders/");

      dispatch({ type: "order/getUserOrders", payload: data });

      getUserOrders();
      console.log("USER ORDERS RES DATA: ", data);
    } catch (error) {
      console.log("USER ORDERS ERROR: ", error);
    }
  };
}

export default orderSlice.reducer;

// export const {} = orderSlice.actions
