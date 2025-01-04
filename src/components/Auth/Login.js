import React, { useState, useEffect, useContext } from "react";
import "./Auth.css";
import "../../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { login } from "../../api/auth";

const Login = () => {
  const { verifyAuthentication } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const response = await login(formData); // Call API function

    if (response.success) {
      setError("");
      verifyAuthentication(); // Verify authentication
      navigate("/"); // Redirect to home page
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  return (
    <section id="#login" className="d-flex">
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
            <h1 className="fw-bold text-white text-center pb-5">Login</h1>
            <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  E-Mail
                </label>
                <input type="email" className="form-control py-3" id="email" name="email" placeholder="johndoe@gmail.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <input type="password" className="form-control py-3" id="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="mb-3 form-check ">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label text-white" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>

              {/* Error Message */}
              <div className="error-container">{error && <p className="text-danger m-0">{error}</p>}</div>

              <button type="submit" className="btn mt-4 py-3 fw-bold custom-button w-100">
                Login
              </button>
            </form>

            <div className="d-flex justify-content-between mt-5 pt-3">
              <p className="text-white">
                New User? <Link to={"/register"}>Register</Link>
              </p>
              <a href="#forgot" className="text-white">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
