import React, { useState, useEffect } from "react";
import "./AddressDetails.css";
import { getDefaultAddress, getAllAddresses } from "../../../api/address";
import Address from "./Address/Address";
import { Link } from "react-router-dom";
import Error from "../../Error/Error";

const AddressDetails = ({ address, setAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  const handleAddressChange = () => {
    setIsChanging(!isChanging);
  };

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDefaultAddress();

      if (response.success) {
        setError("");
        setAddress(response.response);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [setAddress]);

  // Fetch all addresses if isChanging is true and addresses is empty
  useEffect(() => {
    const fetchData = async () => {
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

    if (isChanging && addresses.length === 0) {
      fetchData();
    }
  }, [isChanging, addresses]);

  return (
    <div className="col-12" style={{ height: "40vh" }}>
      <div className="card h-100">
        {/* Address name and default */}
        <div className="card-body address-top-info">
          <div className="d-flex justify-content-between">
            <p className="card-text">
              <span className="fw-bold">Delivery Address</span>
            </p>
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex mt-2" style={{ height: "25vh", overflowY: "auto" }}>
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status" />
              </div>
            ) : error ? (
              <Error message={error} setError={setError} />
            ) : isChanging ? (
              // Display all user addresses
              <div className="d-flex flex-column w-100">
                {/* Grey separator */}
                <div className="border-top border-secondary"></div>

                {addresses.map((address) => (
                  <Address key={address.id} address={address} setAddress={setAddress} setIsChanging={setIsChanging} />
                ))}
              </div>
            ) : (
              // Display selected or default address
              <p className="card-text fs-5">
                {address.full_name}
                <br />
                {address.address_line_1}
                {address.address_line_2 && (
                  <>
                    <br />
                    {address.address_line_2}
                  </>
                )}
                <br />
                {address.city}
                <br />
                {address.postcode}
              </p>
            )}
          </div>
          {/* Address actions */}
          {address.full_name ? (
            <div className="mt-auto">
              <div className="d-flex justify-content-start">
                <button className="btn btn-outline-primary w-25 rounded-0" onClick={handleAddressChange}>
                  {isChanging ? "Cancel" : "Change"}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-auto">
              <div className="d-flex justify-content-start">
                <Link to={"/checkout/add-address"} className="btn btn-outline-primary w-25 rounded-0">
                  Add
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
