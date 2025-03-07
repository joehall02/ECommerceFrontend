import React, { useState, useEffect } from "react";
import "./Auth.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import Error from "../Error/Error";
import Welcome from "./Welcome";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    } else {
      // Remove confirmPassword from the formData object if the passwords match
      const { confirmPassword, ...updatedFormData } = formData;

      // Send a POST request to the server
      const response = await register(updatedFormData); // Call Api function

      if (response.success) {
        setError("");
        navigate(`/awaiting-verification/${formData.email}`); // Redirect to the awaiting verification page
      } else {
        setError(response.message);
      }
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  return (
    <section id="#register" className="d-flex">
      <div className="d-flex flex-lg-row flex-column w-100">
        <Welcome />
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center min-vh-100 auth-form">
          <div className="col-10 col-lg-8">
            <h1 className="fw-bold text-white text-center pb-5">Register</h1>
            <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label text-white">
                  Full Name
                </label>
                <input type="text" className="form-control py-2" id="full_name" name="full_name" placeholder="John Doe" value={formData.full_name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  E-Mail
                </label>
                <input type="email" className="form-control py-2" id="email" name="email" placeholder="johndoe@gmail.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <input type="password" className="form-control py-2" id="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} required />
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
                Register
              </button>
            </form>

            <div className="d-flex justify-content-between mt-5 pt-3">
              <p className="text-white">
                Already Registered? <Link to={"/login"}>Login</Link>
              </p>
              <p className="text-white">
                Forgot Password? <Link to={"/forgot-password"}>Click Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
