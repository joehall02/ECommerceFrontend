// Utility function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    return { success: false, message: error.response.data.error || "An error occurred." };
  } else if (error.request) {
    // Request was made but no response received
    return { success: false, message: "No response from server. Please try again later." };
  } else {
    // Something went wrong setting up the request
    return { success: false, message: "An unexpected error occurred." };
  }
};
