import axios from "axios";
import { handleApiError } from "../utils/apiUtils";

const API_URL = "/user";

// Check if the user is authenticated
export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/authenticate`, { withCredentials: true });
    return { success: true, logged_in: response.data.logged_in };
  } catch (error) {
    return handleApiError(error);
  }
};

// Log the user out
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, { withCredentials: true });
    return { success: true, message: "Logged out successfully." };
  } catch (error) {
    return handleApiError(error);
  }
};

// Log the user in
export const login = async (formData) => {
  try {
    await axios.post("/user/login", formData, { withCredentials: true });
    return { success: true, message: "Logged in successfully." };
  } catch (error) {
    return handleApiError(error);
  }
};

// Register user
export const register = async (formdata) => {
  try {
    await axios.post("/user/signup", formdata);
    return { success: true, message: "Registered successfully." };
  } catch (error) {
    return handleApiError(error);
  }
};
