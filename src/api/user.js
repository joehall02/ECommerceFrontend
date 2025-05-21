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

// Send contact us email
export const sendContactEmail = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/contact-us`, data);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Admin

// Get all users
export const getAllUsers = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin`, {
      params: { page },
    });
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get user by ID
export const getUserById = async (user_id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin/${user_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete guest users
// export const deleteGuestUsers = async () => {
//   try {
//     const response = await axiosInstance.delete(`${API_URL}/admin`);
//     return { success: true, response: response.data };
//   } catch (error) {
//     return handleApiError(error);
//   }
// };
