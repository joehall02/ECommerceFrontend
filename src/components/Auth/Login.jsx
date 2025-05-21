import React, { useState, useEffect, useContext } from "react";
import "./Auth.css";
import "../../App.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { login } from "../../api/auth";
import Error from "../Error/Error";
import Success from "../Success/Success";
import { verifyEmail } from "../../api/auth";
import Welcome from "./Welcome";

const Login = () => {
  const { verifyAuthentication, isAuthenticated, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });

  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [verifiedResponse, setVerifiedResponse] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { verification_token } = useParams();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonDisabled(true);

    // If the user is authenticated, log the user out before logging into another account
    if (isAuthenticated) {
      handleLogout();
    }

    const response = await login(formData); // Call API function

    if (response.success) {
      setError("");
      verifyAuthentication(); // Verify authentication
      navigate("/"); // Redirect to home page
    } else if (response.message === "Email not verified") {
      navigate(`/awaiting-verification/${formData.email}`); // Redirect to the awaiting verification page
    } else {
      setError(response.message);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setToken(verification_token);
  }, [verification_token]);

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        const response = await verifyEmail(token);

        if (response.success) {
          setError("");
          setVerifiedResponse(response.response.message);
        } else {
          setError(response.message);
        }
      };

      verifyToken();
    }
  }, [token]);

  return (
    <section id="#login" className="d-flex">
      <div className="d-flex flex-lg-row flex-column w-100">
        <Welcome />
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center min-vh-100 auth-form">
          <div className="col-10 col-lg-8">
            <h1 className="fw-bold text-white text-center">Login</h1>
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
                <input type="checkbox" className="form-check-input" id="remember_me" name="remember_me" checked={formData.remember_me} onChange={handleChange} />
                <label className="form-check-label text-white" htmlFor="remember_me">
                  Remember Me
                </label>
              </div>

              {/* Error Message */}
              {error && <Error message={error} setError={setError} />}

              {/* Token success response */}
              {verifiedResponse && <Success message={verifiedResponse} setMessage={setVerifiedResponse} />}

              <button type="submit" className="btn mt-4 py-3 fw-bold custom-button w-100" disabled={buttonDisabled}>
                Login
              </button>
            </form>

            <div className="d-flex justify-content-between mt-5 pt-3">
              <p className="text-white">
                New User?
                <br />
                <Link to={"/register"}>Register</Link>
              </p>
              <p className="text-white">
                Forgot Password?
                <br />
                <Link to={"/forgot-password"}>Click Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
