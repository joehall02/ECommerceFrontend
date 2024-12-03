import React, { createContext, useState, useEffect } from "react";
import { checkAuth, logout } from "../api/auth"; // Import Api functions

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated when the component mounts
  const verifyAuthentication = async () => {
    const isLoggedIn = await checkAuth();
    setIsAuthenticated(isLoggedIn);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    verifyAuthentication();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, verifyAuthentication, handleLogout }}>{children}</AuthContext.Provider>;
};
