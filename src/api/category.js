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
