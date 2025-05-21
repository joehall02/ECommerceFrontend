import React, { useState, useEffect } from "react";
import Address from "./Address/Address";
import "./Addresses.css";
import { Link } from "react-router-dom";
import { getAllAddresses, deleteAddress, updateAddress } from "../../../api/address";
import Error from "../../Error/Error";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fetchAddresses = async () => {
    setLoading(true);

    const response = await getAllAddresses();

    if (response.success) {
      setError("");
      setAddresses(response.response);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  const handleSetDefaultAddress = async (address_id) => {
    setButtonDisabled(true);

    // Create a JSON object for address data
    const addressData = { is_default: true };

    const response = await updateAddress(address_id, addressData);

    if (response.success) {
      setError("");
      fetchAddresses();
      setButtonDisabled(false);
    } else {
      setError(response.message);
      setButtonDisabled(false);
    }
  };

  const handleAddressDelete = async (address_id) => {
    setButtonDisabled(true);

    const response = await deleteAddress(address_id);

    if (response.success) {
      setError("");
      fetchAddresses();
      setButtonDisabled(false);
    } else {
      setError(response.message);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="addresses">
      <div className="container min-vh-100 my-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">My Addresses</h2>
          <p className="text-muted mb-0">{addresses.length}/5</p>
        </div>

        <div className="row mt-5">
          <Link to={"/account/addresses/add-address"} className="col-12 col-lg-6 col-xxl-4 mb-5 add-address text-decoration-none">
            <div className="card h-100 border-dashed">
              <div className="card-body d-flex align-items-center row">
                <h4 className="card-text text-center">
                  <i className="bi bi-plus-lg text-center"></i>
                  <br />
                  Add Address
                </h4>
              </div>
            </div>
          </Link>
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status" />
            </div>
          ) : error === "Addresses not found" ? (
            <p></p>
          ) : error ? (
            <Error message={error} setError={setError} />
          ) : (
            addresses.length > 0 && (
              <>
                {addresses.map((address, index) => (
                  <Address
                    key={index}
                    name={address.full_name}
                    addressLine1={address.address_line_1}
                    addressLine2={address.address_line_2}
                    city={address.city}
                    postcode={address.postcode}
                    isDefault={address.is_default}
                    addressId={address.id}
                    handleAddressDelete={() => handleAddressDelete(address.id)}
                    handleSetDefault={() => handleSetDefaultAddress(address.id)}
                    buttonDisabled={buttonDisabled}
                  />
                ))}
              </>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Addresses;
