import React, { useState, useEffect } from "react";
import "../../App.css";
import "./Auth.css";
import { Link, useParams } from "react-router-dom";
import Error from "../Error/Error";
import Success from "../Success/Success";
import { resendVerification } from "../../api/auth";
import Welcome from "./Welcome";

const AwaitingVerification = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [resendResponse, setResendResponse] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { userEmail } = useParams();

  const handleResendVerification = async () => {
    const data = {
      email: email,
    };

    setButtonDisabled(true);

    const response = await resendVerification(data);

    if (response.success) {
      setError("");
      setResendResponse(response.response.message);
      setButtonDisabled(false);
    } else {
      setError(response.message);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setEmail(userEmail);
  }, [userEmail]);

  return (
    <section id="#awaiting-verification" className="d-flex text-white">
      <div className="d-flex flex-lg-row flex-column w-100">
        <Welcome />
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center min-vh-100 auth-form">
          <div className="col-10 col-lg-8 text-center">
            <h1 className="fw-bold text-white pb-2">Verify your email address</h1>
            <p className="mb-4">We have sent you an email with a link to verify your email address.</p>
            <p className="mb-4">If you have not received the email, please check your spam folder.</p>
            <button className="btn mt-4 py-2 fw-bold custom-button w-75" onClick={handleResendVerification} disabled={buttonDisabled}>
              Resend Email
            </button>

            <div className="mt-5 pt-3">
              <p>
                Already Verified?
                <br />
                <Link to={"/login"}>Login</Link>
              </p>
            </div>

            {/* Error message */}
            {error && <Error message={error} setError={setError} />}

            {/* Resend email response */}
            {resendResponse && <Success message={resendResponse} setMessage={setResendResponse} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwaitingVerification;
