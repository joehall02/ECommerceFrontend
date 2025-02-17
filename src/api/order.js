import { handleApiError } from "../utils/apiErrorHandler";
import axiosInstance from "./axiosInstance";

const API_URL = "/order";

// Get all orders
export const getOrders = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/`, {
      params: { page },
    });
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get stripe checkout session
export const getStripeCheckoutSession = async (address) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/checkout`, address);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Admin routes

// Get order by ID
export const getOrderById = async (order_id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin/${order_id}`);
    return { success: true, order: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get all customer orders
export const getAdminOrders = async (params) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin`, { params });
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Update order status
export const updateOrderStatus = async (order_id, data) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/admin/${order_id}`, data);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
