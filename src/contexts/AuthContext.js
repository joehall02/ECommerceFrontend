import React, { createContext, useState, useEffect, useCallback } from "react";
import { checkAuth, logout, refreshToken } from "../api/auth"; // Import Api functions

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is authenticated when the component mounts
  const verifyAuthentication = async () => {
    const response = await checkAuth();

    const { success, logged_in, is_admin } = response;

    if (success) {
      setIsAuthenticated(logged_in);
      setIsAdmin(is_admin);
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
      // handleLogout();
    }
  };

  const handleLogout = useCallback(async () => {
    await logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
  }, []);

  const handleTokenRefresh = useCallback(async () => {
    if (isAuthenticated) {
      const response = await refreshToken();
      if (!response.success) {
        handleLogout();
      }
    }
  }, [isAuthenticated, handleLogout]);

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    verifyAuthentication();

    // Refresh the token every 25 minutes
    if (!isAuthenticated) {
      return;
    }
    const interval = setInterval(() => {
      handleTokenRefresh();
      console.log("Token Refreshed");
    }, 1500000);

    return () => clearInterval(interval);
  }, [isAuthenticated, handleTokenRefresh]);

  return <AuthContext.Provider value={{ isAuthenticated, isAdmin, verifyAuthentication, handleLogout }}>{children}</AuthContext.Provider>;
};
