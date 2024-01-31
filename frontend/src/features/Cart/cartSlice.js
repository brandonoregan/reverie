import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

// Get cart items from local storage and store in inital cartItems state
const localStorageCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: localStorageCartItems,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemError(state, action) {
      state.error = action.payload;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product_id === newItem.product_id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.product_id === existingItem.product_id ? newItem : cartItem
        );
      } else {
        state.cartItems.push(newItem);
      }
    },
    deleteCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export function createOrder() {
  return async function (dispatch, getState) {
    try {
      const cart_items = JSON.parse(localStorage.getItem("cartItems"));

      const order_items = cart_items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const postData = {
        items: order_items,
      };

      const { data } = await axiosInstance.post(
        `http://127.0.0.1:8000/api/order/`,
        postData
      );

      console.log("CREATE ORDER: ", data);
    } catch (error) {
      console.log("CREATE ORDER ERROR: ", error);
    }
  };
}

// export function createOrderItems() {
//   return async function (dispatch, getState) {
//     const cart_Items = JSON.parse(localStorage.getItem("cartItems"));

//     try {
//       const { data } = await axiosInstance.post(
//         `http://127.0.0.1:8000/api/order/items`,
//         cartItems
//       );

//       dispatch({ type: "cart/createOrderItems" });

//       console.log("CREATE ORDER ITEMS: ", data);
//     } catch (error) {
//       console.log("CREATE ORDER ITEMS ERROR: ", error);
//     }
//   };
// }

export function createOrderItem() {}

export function addToCart(id, quantity) {
  return async function (dispatch, getState) {
    try {
      const { data } = await axiosInstance.get(
        `http://127.0.0.1:8000/api/products/${id}`
      );

      console.log("DATA FETCHED:", data);

      dispatch({
        type: "cart/addToCart",
        payload: {
          product_id: data.id,
          name: data.name,
          image: data.image,
          price: data.price,
          stock_count: data.stock_count,
          quantity,
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: "cart/itemError",
        payload: errorMessage,
      });
    }
  };
}

export default cartSlice.reducer;

export const { itemError, deleteCartItem, clearCart } = cartSlice.actions;
