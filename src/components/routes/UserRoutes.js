import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const UserRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, isCustomer, isAdmin } = useContext(AuthContext);

  // If the authentication status is still loading, return null
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  // If the user is authenticated, render the component
  return isAuthenticated && (isCustomer || isAdmin) ? <Outlet {...rest} /> : <Navigate to={"/login"} />;
};

export default UserRoute;
