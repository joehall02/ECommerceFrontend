import React, { useEffect } from "react";
import "./AddAddress.css";
import "./../../../../App.css";
import { Link } from "react-router-dom";

const AddAddress = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <section id="add-address" className="container min-vh-100 my-3 py-5 d-flex justify-content-center column">
      {/* Contact form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
        <div className="col-10 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-5 px-0">
            <h2 className="fw-bold text-start pb-5">Add Address</h2>
            <Link to={"/account/addresses"}>Go Back</Link>
          </div>
          <form className="d-flex flex-column justify-content-center">
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-bold">
                Full Name
              </label>
              <input type="text" className="form-control" id="fullName" name="fullName" placeholder="John Doe" required />
            </div>
            <div className="mb-3">
              <label htmlFor="addressLine1" className="form-label fw-bold">
                Address Line 1
              </label>
              <input type="text" className="form-control" id="addressLine1" name="addressLine1" placeholder="16 Main Street" required />
            </div>
            <div className="mb-3">
              <label htmlFor="addressLine2" className="form-label fw-bold">
                Address Line 2 (Optional)
              </label>
              <input type="text" className="form-control" id="addressLine2" name="addressLine2" placeholder="Apartment 10" />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label fw-bold">
                City
              </label>
              <input type="text" className="form-control" id="city" name="city" placeholder="Manchester" />
            </div>
            <div className="mb-3">
              <label htmlFor="postcode" className="form-label fw-bold">
                Postcode
              </label>
              <input type="text" className="form-control" id="postcode" name="postcode" placeholder="MB7 8IY" />
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="defaultAddress" name="defaultAddress" />
              <label className="form-check-label" htmlFor="defaultAddress">
                Make this my default address
              </label>
            </div>

            <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddAddress;
