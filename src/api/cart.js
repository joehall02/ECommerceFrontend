import { handleApiError } from "../utils/apiErrorHandler";
import axiosInstance from "./axiosInstance";

const API_URL = "/cart";

// Get cart products
export const getCartProducts = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Add product to cart
export const addProductToCart = async (product_id, quantity) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/${product_id}`, quantity);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Edit product quantity in cart
export const editProductQuantityInCart = async (cart_product_id, quantity) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${cart_product_id}`, quantity);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete product from cart
export const deleteProductFromCart = async (cart_product_id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${cart_product_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
