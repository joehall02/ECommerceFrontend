import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Success = () => {
  const { verifyAuthentication } = useContext(AuthContext);

  // Verify authentication when the component mounts
  useEffect(() => {
    verifyAuthentication();
  }, [verifyAuthentication]);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-1 text-success">Order Successful</h1>
        <p className="lead">Thank you for your order. You will receive an email confirmation shortly.</p>
      </div>
    </div>
  );
};

export default Success;
