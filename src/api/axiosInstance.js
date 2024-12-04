import axios from "axios";
import { getCookie } from "../utils/getCookie";

// Create an axios instance
export const axiosInstance = axios.create({
  withCredentials: true,
});

// Add x-csrf-token from cookie to headers for every request
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrf_access_token");
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  } else {
    console.error("CSRF token not found in cookies.");
  }
  return config;
});
