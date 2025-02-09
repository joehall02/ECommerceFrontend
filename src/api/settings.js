import { handleApiError } from "../utils/apiErrorHandler";
import axiosInstance from "./axiosInstance";

const API_URL = "/user";

// Edit user's name
export const editName = async (newName) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/edit-name`, newName);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Edit password
export const editPassword = async (data) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/edit-password`, data);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete account
export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/delete-account`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get full name
export const getFullName = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
