import axios from "axios";
import { refreshToken } from "./auth";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5050", // API URL
  withCredentials: true, // Required to send cookies
});

// Keep track of whether the refresh token is being attempted
let isRefreshing = false;

// Keep track of subscribers waiting for the token refresh, this means that multiple requests will wait for the token refresh
// A subscriber means a function that will be called when the token is refreshed
let refreshSubscribers = [];

// Function to call all subscribers waiting for the token refresh
const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

// Function to add a subscriber to the list of subscribers waiting for the token refresh
const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Response interceptor to check for 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Interceptor caught error:", error.response ? error.response.status : error.message);

    const originalRequest = error.config;

    // If the request fails with a 401 and hasn't been retried yet, check if we're refreshing
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log("401 error detected. Checking if token refresh is needed...");

      // Don't refresh token if the original request was to authenticate
      if (originalRequest.url.includes("/authenticate")) {
        console.log("Not refreshing token for authenticate.");
        return Promise.reject(error);
      }

      // Don't refresh token if the original request was to refresh
      if (originalRequest.url.includes("/refresh")) {
        console.log("Not refreshing token for refresh.");
        return Promise.reject(error);
      }

      // If a refresh is already in progress, wait for the refresh to finish
      if (isRefreshing) {
        console.log("Already refreshing token. Waiting...");
        // Return a new promise that will retry the original request after the token refresh
        return new Promise((resolve) => {
          addSubscriber(() => {
            console.log("Retrying original request after refresh...");
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      // Set the retry flag to prevent infinite loops, and attempt to refresh the token
      originalRequest._retry = true;
      isRefreshing = true;

      // Attempt to refresh the token
      try {
        await refreshToken();
        console.log("Token refreshed. Retrying original request...");
        onTokenRefreshed();
        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If the refresh fails, reject the error
        console.error("Token refresh failed. Logging out user.");
        // const { handleLogout } = useAuth();
        // handleLogout();

        if (axiosInstance.handleLogout) {
          axiosInstance.handleLogout();
        }
        return Promise.reject(refreshError);
      } finally {
        // Reset the refresh flag and clear the subscribers
        isRefreshing = false;
        refreshSubscribers = [];
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
