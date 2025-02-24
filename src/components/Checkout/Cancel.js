import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Cancel = () => {
  const { verifyAuthentication } = useContext(AuthContext);

  // Verify authentication when the component mounts
  useEffect(() => {
    verifyAuthentication();
  }, [verifyAuthentication]);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-1 text-danger">Order Cancelled</h1>
        <p className="lead">Your order has been cancelled.</p>
      </div>
    </div>
  );
};

export default Cancel;
