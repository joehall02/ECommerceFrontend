import React, { useState, useEffect } from "react";
import "./Auth.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import Error from "../Error/Error";

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
        navigate("/login"); // Redirect to the login page
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
        <div className="col-12 col-lg-6 bg-primary d-none d-lg-flex align-items-center justify-content-center min-vh-100">
          <div className="col-10">
            <h1 className="text-white auth-header fw-bold">Welcome to Lorem Ipsum</h1>
            <p className="text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex aliquam ut, labore rem, alias dolorem beatae harum, voluptas ducimus provident nobis reiciendis voluptate. Maxime eum
              explicabo veniam iure labore odio.
            </p>
          </div>
        </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
