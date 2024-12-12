import { handleApiError } from "../utils/apiErrorHandler";
import axiosInstance from "./axiosInstance";

const API_URL = "/product";

// Get all products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/`);
    return { success: true, products: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
