import axios from "axios";

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5050",
  withCredentials: true,
});

// Request interceptor, add x-csrf-token from response header to headers for all requests
axiosInstance.interceptors.request.use(
  (response) => {
    const csrfToken = response.headers["x-csrf-token"];
    if (csrfToken) {
      axiosInstance.defaults.headers.common["x-csrf-token"] = csrfToken;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor, Add x-csrf-token from headers to every request
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = axiosInstance.defaults.headers.common["x-csrf-token"];
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }
  return config;
});
