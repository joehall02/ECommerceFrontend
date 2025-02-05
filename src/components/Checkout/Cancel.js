import React from "react";

const Cancel = () => {
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
