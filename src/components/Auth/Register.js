import React from "react";
import "./Auth.css";

const Register = () => {
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
            <h1 className="fw-bold text-white text-center pb-5">Register</h1>
            <form className="d-flex flex-column justify-content-center">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label text-white">
                  First Name
                </label>
                <input type="text" className="form-control py-2" id="firstName" name="firstName" placeholder="john" required />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label text-white">
                  Last Name
                </label>
                <input type="text" className="form-control py-2" id="lastName" name="lastName" placeholder="doe" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  E-Mail
                </label>
                <input type="text" className="form-control py-2" id="email" name="email" placeholder="johndoe@gmail.com" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <input type="text" className="form-control py-2" id="password" name="password" placeholder="********" required />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label text-white">
                  Confirm Password
                </label>
                <input type="text" className="form-control py-2" id="confirmPassword" name="confirmPassword" placeholder="********" required />
              </div>

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
