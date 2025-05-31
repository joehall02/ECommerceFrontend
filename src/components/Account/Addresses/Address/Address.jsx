import React from "react";
import { Link } from "react-router-dom";
import "./Address.css";

const Address = ({ name, addressLine1, addressLine2, city, postcode, addressId, isDefault, handleAddressDelete, handleSetDefault, buttonDisabled }) => {
  return (
    // Address component
    <div className="col-12 col-lg-6 col-xxl-4 mb-5 address">
      <div className="card h-100">
        {/* Address name and default */}
        <div className="card-body address-top-info">
          <div className="d-flex justify-content-between">
            <small className="card-text fw-bold text-truncate">{name}</small>
            <small className="card-text">{isDefault ? <span className="badge bg-primary">Default</span> : ""}</small>
          </div>
        </div>
        {/* Address Details */}
        <div className="card-body d-flex row">
          {/* Address */}
          <div className="d-flex flex-column">
            <p className="fw-bold">Delivery Address:</p>
            <p className="text-truncate">{addressLine1}</p>
            {addressLine2 && (
              <>
                <p className="text-truncate">{addressLine2}</p>
              </>
            )}
            <p className="text-truncate">{city}</p>
            <p className="text-truncate">{postcode}</p>
          </div>
          {/* Address actions */}
          <div className="mt-auto">
            <div className="d-flex justify-content-start">
              <Link to={`/account/addresses/edit-address/${addressId}`} className="btn btn-outline-primary rounded-0">
                Edit
              </Link>
              <button className="btn btn-outline-danger ms-2 rounded-0" onClick={handleAddressDelete} disabled={buttonDisabled}>
                Delete
              </button>
              {isDefault ? (
                ""
              ) : (
                <button className="btn btn-outline-primary ms-2 rounded-0" onClick={handleSetDefault} disabled={buttonDisabled}>
                  Set as Default
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
