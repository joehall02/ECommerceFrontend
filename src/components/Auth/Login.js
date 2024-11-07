import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

const Login = () => {
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
            <form className="d-flex flex-column justify-content-center">
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  E-Mail
                </label>
                <input type="text" className="form-control py-3" id="email" name="email" placeholder="johndoe@gmail.com" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <input type="text" className="form-control py-3" id="password" name="password" placeholder="********" required />
              </div>
              <div className="mb-3 form-check ">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label text-white" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>

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
