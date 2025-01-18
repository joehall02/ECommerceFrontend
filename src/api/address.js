import { handleApiError } from "../utils/apiErrorHandler";
import axiosInstance from "./axiosInstance";

const API_URL = "/address";

// Get all addresses for a user
export const getAllAddresses = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get address by id
export const getAddressById = async (address_id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${address_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new address
export const createAddress = async (address) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/`, address);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Get default address
export const getDefaultAddress = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/default`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
// Update an address
export const updateAddress = async (address_id, address) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${address_id}`, address);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete an address
export const deleteAddress = async (address_id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${address_id}`);
    return { success: true, response: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
