import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { checkStripeSessionStatus } from "../../api/order";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const { verifyAuthentication } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const maxRetries = 10;
  const retryInterval = 2000; // 2 seconds

  // Get the session ID from the URL
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    verifyAuthentication();
  }, [verifyAuthentication]);

  // Poll for order status using the session ID
  useEffect(() => {
    let attempts = 0;

    const pollForOrder = async () => {
      // If the session ID is not available, set an error and stop polling
      if (!sessionId) {
        setError("No session ID provided.");
        setLoading(false);
        return;
      }

      // Keep trying to check the order status until it succeeds or max retries is reached
      try {
        const response = await checkStripeSessionStatus(sessionId);

        if (response.success) {
          setOrderSuccess(true);
          setLoading(false);
        } else {
          attempts++;

          // If the order is not found, wait and retry
          if (attempts < maxRetries) {
            setTimeout(pollForOrder, retryInterval);
          } else {
            setError("Order not found. Please contact support if your payment was completed.");
            setLoading(false);
          }
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        setLoading(false);
      }
    };

    pollForOrder();
  }, [sessionId]);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      {loading ? (
        <div className="text-center">
          <h2>Processing your order...</h2>
          <p>Please wait a moment.</p>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        </div>
      ) : orderSuccess ? (
        <div className="text-center">
          <h1 className="display-1 text-success">Order Successful</h1>
          <p className="lead">Thank you for your order. You will receive an email confirmation shortly.</p>
        </div>
      ) : (
        <div className="text-center text-danger">
          <h1 className="display-4">Order Not Found</h1>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Success;
