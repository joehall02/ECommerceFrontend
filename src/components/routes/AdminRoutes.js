import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);

  // If the authentication status is still loading, return null
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  // If the user is authenticated and is an admin, render the component
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AdminRoute;
