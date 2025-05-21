import React, { useState, useEffect } from "react";
import "./AddressDetails.css";
import { getDefaultAddress, getAllAddresses } from "../../../api/address";
import Address from "./Address/Address";
import { Link } from "react-router-dom";
import Error from "../../Error/Error";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const AddressDetails = ({ address, setAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const { isAdmin, isCustomer } = useContext(AuthContext);

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
        if (!(response.message === "Default address not found")) {
          setError(response.message);
        }
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
    // <div className="col-12" style={{ height: "40vh" }}>
    <div className="col-12">
      <div className="card">
        {/* Address name and default */}
        <div className="card-body address-top-info">
          <div className="d-flex justify-content-between">
            <p className="card-text">
              <span className="fw-bold">Delivery Address</span>
            </p>
          </div>
        </div>
        {!address.full_name ? (
          <Link to={"/checkout/add-address"} className="h-100 text-decoration-none">
            <div className="card h-100 border-dashed rounded-0">
              <div className="card-body d-flex align-items-center row" style={{ height: "35vh" }}>
                <h4 className="card-text text-center">
                  <i className="bi bi-plus-lg text-center"></i>
                  <br />
                  Add Address
                </h4>
              </div>
            </div>
          </Link>
        ) : (
          <>
            <div className="card-body d-flex flex-column">
              <div className="d-flex mt-2" style={{ height: "35vh", overflowY: "auto" }}>
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
                    <b>{address.full_name}</b>
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
              {address.full_name && (
                <div className="mt-auto">
                  <div className="d-flex justify-content-start">
                    {/* If the user is a guest, show the "Add Address" button. Else show change address button */}
                    {isAdmin !== true && isCustomer !== true ? (
                      <Link to={"/checkout/add-address"} className="btn btn-outline-primary rounded-0 me-2">
                        Add Address
                      </Link>
                    ) : (
                      <button className="btn btn-outline-primary rounded-0 mt-2" onClick={handleAddressChange}>
                        {isChanging ? "Cancel" : "Change"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Disclamer */}
      <p className="text-center">
        <small>We only deliver to the UK. If you are outside the UK, please contact us for more information.</small>
      </p>
    </div>
  );
};

export default AddressDetails;
