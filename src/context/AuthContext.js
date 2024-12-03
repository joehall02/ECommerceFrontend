import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated when the component mounts
  const checkAuth = async () => {
    try {
      const response = await axios.get("/user/authenticate", { withCredentials: true });

      if (response.data.logged_in) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/user/logout", { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>{children}</AuthContext.Provider>;
};
