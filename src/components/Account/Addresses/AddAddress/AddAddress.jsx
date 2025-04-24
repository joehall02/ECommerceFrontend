import React, { useState, useEffect } from "react";
import "./AddAddress.css";
import "../../../../App.css";
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
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const nameCharCount = address.full_name.length;
  const addressLine1CharCount = address.address_line_1.length;
  const addressLine2CharCount = address.address_line_2.length;
  const cityCharCount = address.city.length;
  const postcodeCharCount = address.postcode.length;

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

    setButtonDisabled(true);

    // Create a JSON object for address data
    const addressData = { ...address };

    // Send a POST request to the server to create a new address
    const response = await createAddress(addressData);

    if (response.success) {
      setError("");
      navigate("/account/addresses");
    } else {
      setError(response.message);
      setButtonDisabled(false);
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
            <h2 className="fw-bold text-start mb-0">Add Address</h2>
            <Link to={"/account/addresses"}>Go Back</Link>
          </div>
          <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor="full_name" className="form-label fw-bold m-0">
                  Full Name
                </label>
                <small className="text-muted">{nameCharCount}/100</small>
              </div>
              <input type="text" className="form-control" id="full_name" name="full_name" placeholder="John Doe" value={address.full_name} onChange={handleInputChange} maxLength={100} required />
            </div>
            {/* Address Line 1 */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor="address_line_1" className="form-label fw-bold m-0">
                  Address Line 1
                </label>
                <small className="text-muted">{addressLine1CharCount}/100</small>
              </div>
              <input
                type="text"
                className="form-control"
                id="address_line_1"
                name="address_line_1"
                placeholder="16 Main Street"
                value={address.address_line_1}
                onChange={handleInputChange}
                maxLength={100}
                required
              />
            </div>
            {/* Address Line 2 */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor="address_line_2" className="form-label fw-bold m-0">
                  Address Line 2 (Optional)
                </label>
                <small className="text-muted">{addressLine2CharCount}/100</small>
              </div>
              <input
                type="text"
                className="form-control"
                id="address_line_2"
                name="address_line_2"
                placeholder="Apartment 10"
                value={address.address_line_2}
                onChange={handleInputChange}
                maxLength={100}
              />
            </div>
            {/* City */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor="city" className="form-label fw-bold m-0">
                  City
                </label>
                <small className="text-muted">{cityCharCount}/100</small>
              </div>
              <input type="text" className="form-control" id="city" name="city" placeholder="Manchester" value={address.city} onChange={handleInputChange} maxLength={100} />
            </div>
            {/* Postcode */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor="postcode" className="form-label fw-bold m-0">
                  Postcode
                </label>
                <small className="text-muted">{postcodeCharCount}/20</small>
              </div>
              <input type="text" className="form-control" id="postcode" name="postcode" placeholder="MB7 8IY" value={address.postcode} onChange={handleInputChange} maxLength={20} />
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="is_default" name="is_default" value={address.is_default} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="is_default">
                Make this my default address
              </label>
            </div>

            <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto" disabled={buttonDisabled}>
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
