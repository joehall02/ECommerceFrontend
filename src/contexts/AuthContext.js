import React, { createContext, useState, useEffect, useCallback } from "react";
import { checkAuth, logout, refreshToken } from "../api/auth"; // Import Api functions
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(async () => {
    console.log("Logging out function");
    await logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsCustomer(false);
  }, []);

  // Check if the user is authenticated when the component mounts
  const verifyAuthentication = useCallback(async () => {
    try {
      const response = await checkAuth();

      const { success, logged_in, is_admin, is_customer } = response;

      if (success) {
        setIsAuthenticated(logged_in);
        setIsAdmin(is_admin);
        setIsCustomer(is_customer);
      } else {
        // If the initial authentication check fails, attempt to refresh the token
        try {
          await refreshToken();

          // Retry the initial authentication check
          const retryResponse = await checkAuth();
          const { success: retrySuccess, logged_in: retryLoggedIn, is_admin: retryIsAdmin, is_customer: retryIsCustomer } = retryResponse;

          if (retrySuccess) {
            setIsAuthenticated(retryLoggedIn);
            setIsAdmin(retryIsAdmin);
            setIsCustomer(retryIsCustomer);
          } else {
            handleLogout();
          }
        } catch (refreshError) {
          console.error("Token refresh failed on initial check.");
          handleLogout();
        }
      }
    } catch (error) {
      console.log(error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  // Add the handleLogout function to the axiosInstance
  axiosInstance.handleLogout = handleLogout;

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    verifyAuthentication();
  }, [isAuthenticated, verifyAuthentication]);

  return <AuthContext.Provider value={{ isAuthenticated, isAdmin, isCustomer, loading, verifyAuthentication, handleLogout }}>{children}</AuthContext.Provider>;
};
