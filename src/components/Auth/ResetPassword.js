import React, { useState, useEffect } from "react";
import "./Auth.css";
import "../../App.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import Error from "../Error/Error";
import Welcome from "./Welcome";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    new_password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { reset_token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm passwords match
    if (formData.new_password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    } else {
      // Remove confirmPassword from the formData object if the passwords match
      const { confirmPassword, ...updatedFormData } = formData;

      // Send a POST request to the server
      const response = await resetPassword(token, updatedFormData);

      if (response.success) {
        setError("");
        navigate("/login");
      } else {
        setError(response.message);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setToken(reset_token);
  }, [reset_token]);

  return (
    <section id="#forgot-password" className="d-flex">
      <div className="d-flex flex-lg-row flex-column w-100">
        <Welcome />
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center min-vh-100 auth-form">
          <div className="col-10 col-lg-8">
            <h1 className="fw-bold text-white text-center pb-5">Reset Password</h1>
            <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="new_password" className="form-label text-white">
                  Password
                </label>
                <input type="password" className="form-control py-2" id="new_password" name="new_password" placeholder="********" value={formData.new_password} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control py-2"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Error Message */}
              {error && <Error message={error} setError={setError} />}

              <button type="submit" className="btn mt-4 py-3 fw-bold custom-button w-100">
                Confirm
              </button>
            </form>

            <div className="d-flex justify-content-between mt-5 pt-3">
              <p className="text-white">
                New User? <Link to={"/register"}>Register</Link>
              </p>
              <p className="text-white">
                Already Registered? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
