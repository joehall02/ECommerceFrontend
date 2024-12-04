import { handleApiError } from "../utils/apiErrorHandler";
import { axiosInstance } from "./axiosInstance";

const API_URL = "/user";

// Check if the user is authenticated
export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/authenticate`);
    const { logged_in, is_admin } = response.data;
    return { success: true, logged_in, is_admin };
  } catch (error) {
    return handleApiError(error);
  }
};

// Log the user out
export const logout = async () => {
  try {
    await axiosInstance.post(`${API_URL}/logout`);
    return { success: true, message: "Logged out successfully." };
  } catch (error) {
    return handleApiError(error);
  }
};

// Log the user in
export const login = async (formData) => {
  try {
    await axiosInstance.post("/user/login", formData);
    return { success: true, message: "Logged in successfully." };
  } catch (error) {
    return handleApiError(error);
  }
};

// Register user
export const register = async (formdata) => {
  try {
    await axiosInstance.post("/user/signup", formdata);
    return { success: true, message: "Registered successfully." };
  } catch (error) {
    return handleApiError(error);
  }
};

// Handle token refresh
