import axios from "axios";

// const baseURL = "https://reverie-reading.onrender.com/api/";

// Conditionally set base url
let baseURL;

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  baseURL = "http://127.0.0.1:8000/api/";
} else {
  baseURL = "https://reverie-reading.onrender.com/api/";
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + JSON.parse(localStorage.getItem("access_token"))
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(error);

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    //
    if (
      // error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              console.log("AUTO REFRESH: ", response);

              localStorage.setItem(
                "access_token",
                JSON.stringify(response.data.access)
              );

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);

          localStorage.setItem("preLoginURL", window.location.href);

          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");

        // If a user was redirected from an external page set the login as that page else set it to home, then redirect to the login page
        if (
          window.location.href !== "https://reverie-reading.onrender.com/login/"
        ) {
          localStorage.setItem("preLoginURL", window.location.href);

          console.log("Window Location", window.location.href);

          window.location.href = "/login/";
        } else {
          localStorage.setItem(
            "preLoginURL",
            "https://reverie-reading.onrender.com"
          );
          localStorage.setItem("loginError", error.response.data.detail);

          window.location.href = "/login/";
        }
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
