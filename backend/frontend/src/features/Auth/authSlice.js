import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { jwtDecode } from "jwt-decode";

function checkIsAdmin(token) {
  try {
    // Decode the token to get its payload
    const decodedToken = jwtDecode(token);
    // Check if isAdmin 'claim' exists and is true
    return decodedToken.isAdmin === true;
  } catch (error) {
    console.error("CHECK ADMIN: ", error);
    return false;
  }
}

// Set user info inital state
let localStorageUserInfo = [];
let loggedIn = false;
let isAdmin = false;

const storedAccessToken = localStorage.getItem("access_token");
const storedRefreshToken = localStorage.getItem("refresh_token");

if (storedAccessToken && storedRefreshToken) {
  localStorageUserInfo = {
    access_token: JSON.parse(storedAccessToken),
    refresh_token: JSON.parse(storedRefreshToken),
  };
  isAdmin = checkIsAdmin(storedAccessToken);
  loggedIn = true;
}

const initialState = {
  userInfo: localStorageUserInfo,
  loggedIn: loggedIn,
  isAdmin: isAdmin,
  isLoading: false,
  error: null,
  registerError: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userInfo = action.payload;
      state.loggedIn = true;
    },
    loginAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    registerUser(state, action) {
      state.userInfo = action.payload;
      state.loggedIn = true;
    },
    logoutUser(state) {
      state.userInfo = [];
      state.loggedIn = false;
      state.isAdmin = false;
    },
    registerError(state, action) {
      state.registerError = action.payload;
    },
    loginError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    loadingLogin(state) {
      state.isLoading = true;
    },
  },
});

export function loginUser(username, password) {
  return async function (dispatch) {
    dispatch(loadingLogin());

    try {
      const res = await axiosInstance.post("token/", {
        username,
        password,
      });

      console.log("LOGIN RES: ", res);
      // Handle success
      const { access, refresh } = res.data;

      localStorage.setItem("refresh_token", JSON.stringify(refresh));
      localStorage.setItem("access_token", JSON.stringify(access));

      axiosInstance.defaults.headers["Authorization"] = "JWT " + access;

      dispatch({
        type: "authentication/loginUser",
        payload: { access_token: access, refresh_token: refresh },
      });

      const isAdmin = checkIsAdmin(access);

      dispatch(loginAdmin(isAdmin));

      const preLoginURL = localStorage.getItem("preLoginURL");

      if (isAdmin) {
        window.location.href = "/admin";
        localStorage.removeItem("preLoginURL");
      } else if (preLoginURL) {
        window.location.href = preLoginURL;
        localStorage.removeItem("preLoginURL");
      } else {
        window.location.href = "/";
      }

      localStorage.removeItem("loginError");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      dispatch(loginError(error.response.data.detail));
    }
  };
}

export function registerUser(
  username,
  first_name,
  last_name,
  email,
  password,
  passwordConfirm
) {
  return async function (dispatch) {
    dispatch(loadingLogin());

    axiosInstance
      .post(`user/register/`, {
        username,
        first_name,
        last_name,
        email,
        password,
        passwordConfirm,
      })
      .then((res) => {
        console.log("REGISTER POST RESPONSE:", res);
        console.log(res.data);

        localStorage.setItem(
          "refresh_token",
          JSON.stringify(res.data.refresh_token)
        );
        localStorage.setItem(
          "access_token",
          JSON.stringify(res.data.access_token)
        );

        // Update userInfo state
        dispatch({
          type: "authentication/registerUser",
          payload: {
            refresh_token: res.data.refresh_token,
            access_token: res.data.access_token,
          },
        });

        window.location.href = "/";

        // Reset Error Message to null
        dispatch(registerError(null));
      })
      .catch((error) => {
        console.log("REGISTER ERROR:", error.response.data);

        dispatch(registerError(error.response.data));
      });
  };
}

export function logoutUser() {
  return async function (dispatch) {
    dispatch(loadingLogin());

    try {
      const { data } = await axiosInstance.post("user/logout/blacklist/", {
        refresh_token: JSON.parse(localStorage.getItem("refresh_token")),
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      if (localStorage.getItem("cartItems")) {
        localStorage.removeItem("cartItems");
      }

      axiosInstance.defaults.headers["Authorization"] = null;

      dispatch({ type: "authentication/logoutUser" });
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      dispatch(loginError(error.message));
    }
  };
}

export default authSlice.reducer;

export const { loadingLogin, loginError, registerError, loginAdmin } =
  authSlice.actions;
