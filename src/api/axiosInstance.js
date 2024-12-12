import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5050",
  withCredentials: true,
});

// Response interceptor to extract the CSRF token from the response headers
axiosInstance.interceptors.response.use(
  (response) => {
    const csrfAccessToken = response.headers["x-access-csrf-token"];
    const csrfRefreshToken = response.headers["x-refresh-csrf-token"];

    if (csrfAccessToken) {
      axiosInstance.defaults.headers.common["x-access-csrf-token"] = csrfAccessToken;
    }
    if (csrfRefreshToken) {
      axiosInstance.defaults.headers.common["x-refresh-csrf-token"] = csrfRefreshToken;
    }
    console.log("Tokens here: ", axiosInstance.defaults.headers.common);

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor to add the CSRF token to the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    let csrfToken;

    if (config.url === "/user/refresh") {
      csrfToken = axiosInstance.defaults.headers.common["x-refresh-csrf-token"];
      console.log("Refresh CSRF token request: ", csrfToken);
      if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
      } else {
        console.error("Refresh CSRF token not found in the request headers.");
      }
    } else {
      csrfToken = axiosInstance.defaults.headers.common["x-access-csrf-token"];
      console.log("Access CSRF token request: ", csrfToken);
      if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
      } else {
        console.error("Access CSRF token not found in the request headers.");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
