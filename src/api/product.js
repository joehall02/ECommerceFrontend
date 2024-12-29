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

// Get product by id
export const getProductById = async (product_id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${product_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get product image by product id
export const getProductImage = async (product_id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/product-image/${product_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Admin routes

// Get all products
export const getAdminProducts = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin`);
    return { success: true, products: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new product
export const createProduct = async (product) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/admin`, product);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Edit a product
export const editProduct = async (product_id, product) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/admin/${product_id}`, product);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a product
export const deleteProduct = async (product_id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/admin/${product_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a product image
export const addProductImages = async (product_id, image) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/admin/product-image/${product_id}`, image);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a product image
// export const deleteProductImage = async (product_id) => {
//   try {
//     const response  = await axiosInstance.delete(`${API_URL}/admin/product-image/${product_id}`);
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// Create a featured product
export const addFeaturedProduct = async (product_id) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/admin/featured-product/${product_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a featured product
export const deleteFeaturedProduct = async (product_id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/admin/featured-product/${product_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Check if a product is a featured product
export const checkFeaturedProduct = async (product_id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin/featured-product/${product_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
