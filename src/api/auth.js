import { handleApiError } from "../utils/apiErrorHandler";
import axiosInstance from "./axiosInstance";

const API_URL = "/user";

// Check if the user is authenticated
export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/authenticate`);
    const { logged_in, is_admin, is_customer } = response.data;
    return { success: true, logged_in, is_admin, is_customer };
  } catch (error) {
    return handleApiError(error);
  }
};

// Log the user out
export const logout = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}/logout`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Log the user in
export const login = async (formData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, formData);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Register user
export const register = async (formdata) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/signup`, formdata);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Handle token refresh
export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}/refresh`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Reset password
export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/reset-password`, data);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get admin data
export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
