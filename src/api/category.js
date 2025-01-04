import { handleApiError } from "../utils/apiErrorHandler";
import axiosInstance from "./axiosInstance";

const API_URL = "/category";

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/`);
    return { success: true, categories: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get category by id
export const getCategoryById = async (category_id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${category_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Admin Routes

// Create a new category
export const createCategory = async (category) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/admin`, category);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Update a category
export const updateCategory = async (category) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/admin/${category.id}`, category);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a category
export const deleteCategory = async (category_id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/admin/${category_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
