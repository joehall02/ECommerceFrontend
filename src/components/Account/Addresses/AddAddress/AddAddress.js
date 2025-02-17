import React, { useState, useEffect } from "react";
import "./AddAddress.css";
import "./../../../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { createAddress } from "../../../../api/address";
import Error from "../../../Error/Error";

const AddAddress = () => {
  const [address, setAddress] = useState({
    full_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    postcode: "",
    is_default: false,
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    // If the input is the is_default checkbox, set the value to the checked state
    if (e.target.name === "is_default") {
      setAddress({ ...address, is_default: e.target.checked });
    } else {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object for address data
    const addressData = { ...address };

    // Send a POST request to the server to create a new address
    const response = await createAddress(addressData);

    if (response.success) {
      setError("");
      navigate("/account/addresses");
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="add-address" className="container min-vh-100 my-3 py-5 d-flex justify-content-center column">
      {/* Contact form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
        <div className="col-10 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-5 px-0">
            <h2 className="fw-bold text-start">Add Address</h2>
            <Link to={"/account/addresses"}>Go Back</Link>
          </div>
          <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="full_name" className="form-label fw-bold">
                Full Name
              </label>
              <input type="text" className="form-control" id="full_name" name="full_name" placeholder="John Doe" value={address.full_name} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address_line_1" className="form-label fw-bold">
                Address Line 1
              </label>
              <input type="text" className="form-control" id="address_line_1" name="address_line_1" placeholder="16 Main Street" value={address.address_line_1} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address_line_2" className="form-label fw-bold">
                Address Line 2 (Optional)
              </label>
              <input type="text" className="form-control" id="address_line_2" name="address_line_2" placeholder="Apartment 10" value={address.address_line_2} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label fw-bold">
                City
              </label>
              <input type="text" className="form-control" id="city" name="city" placeholder="Manchester" value={address.city} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="postcode" className="form-label fw-bold">
                Postcode
              </label>
              <input type="text" className="form-control" id="postcode" name="postcode" placeholder="MB7 8IY" value={address.postcode} onChange={handleInputChange} />
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="is_default" name="is_default" value={address.is_default} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="is_default">
                Make this my default address
              </label>
            </div>

            <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
              Submit
            </button>

            {/* Error message */}
            {error && <Error message={error} setError={setError} />}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddAddress;
