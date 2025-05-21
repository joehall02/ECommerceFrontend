import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import Success from "../Success/Success";
import Error from "../Error/Error";
import { sendResetPasswordEmail } from "../../api/auth";
import "./Auth.css";
import "../../App.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [emailSentResponse, setEmailSentResponse] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const charEmailCount = formData.email.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonDisabled(true);

    const response = await sendResetPasswordEmail(formData);

    if (response.success) {
      setError("");
      setEmailSentResponse(response.response.message);
      setButtonDisabled(false);
    } else {
      setError(response.message);
      setEmailSentResponse("");
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="#forgot-password" className="d-flex">
      <div className="d-flex flex-lg-row flex-column w-100">
        <Welcome />
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center min-vh-100 auth-form">
          <div className="col-10 col-lg-8">
            <h1 className="fw-bold text-white text-center">Forgot Password</h1>
            <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="email" className="form-label text-white m-0">
                    E-Mail
                  </label>
                  <small className="text-white">{charEmailCount}/100</small>
                </div>
                <input type="email" className="form-control py-3" id="email" name="email" placeholder="johndoe@gmail.com" value={formData.email} onChange={handleChange} maxLength={100} required />
              </div>

              {/* Error Message */}
              {error && <Error message={error} setError={setError} />}

              {/* Token success response */}
              {emailSentResponse && <Success message={emailSentResponse} setMessage={setEmailSentResponse} />}

              <button type="submit" className="btn mt-4 py-3 fw-bold custom-button w-100" disabled={buttonDisabled}>
                Confirm
              </button>
            </form>

            <div className="d-flex justify-content-between mt-5 pt-3">
              <p className="text-white">
                New User?
                <br />
                <Link to={"/register"}>Register</Link>
              </p>
              <p className="text-white">
                Already Registered?
                <br />
                <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
