import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
const initialState = {
  userInfo: [],
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userInfo = action.payload;
    },
    loginError(state, action) {
      state.error = action.payload;
    },
    loadingLogin(state, action) {
      state.isLoading = true;
    },
  },
});

export function loginUser(username, password) {
  return async function (dispatch) {
    dispatch(loadingLogin());
    try {
      const { data } = await axiosInstance.post("token/", {
        username: username,
        password: password,
      });
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axiosInstance.defaults.headers["Authorization"] = "JWT " + data.access;
      dispatch({ type: "authentication/loginUser", payload: data });
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      dispatch(loginError(error.message));
    }
  };
}

export default authSlice.reducer;

export const { loadingLogin, loginError } = authSlice.actions;
