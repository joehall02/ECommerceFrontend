import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  // If the user is authenticated and is an admin, render the component
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to={"/"} />;
};

export default AdminRoute;
