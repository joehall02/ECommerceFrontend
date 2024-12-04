import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const UserRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is authenticated and is an admin, render the component
  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;
};

export default UserRoute;
