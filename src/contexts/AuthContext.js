import React, { createContext, useState, useEffect } from "react";
import { checkAuth, logout } from "../api/auth"; // Import Api functions

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
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    verifyAuthentication();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, isAdmin, verifyAuthentication, handleLogout }}>{children}</AuthContext.Provider>;
};
