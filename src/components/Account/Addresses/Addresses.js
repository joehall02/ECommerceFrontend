import React, { useEffect } from "react";
import Address from "./Address/Address";
import "./Addresses.css";
import { Link } from "react-router-dom";

const Addresses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const sampleAddresses = [
    { name: "John Doe", addressLine1: "123 Fake Street", addressLine2: "Fake Town", city: "Fake City", postcode: "FA1 2KE", isDefault: true },
    { name: "John Does", addressLine1: "123 Fake Street", addressLine2: "Fake Town", city: "Fake City", postcode: "FA1 2KE", isDefault: false },
    { name: "John Deez", addressLine1: "123 Fake Street", addressLine2: "Fake Town", city: "Fake City", postcode: "FA1 2KE", isDefault: false },
    { name: "John Deez", addressLine1: "123 Fake Street", addressLine2: "Fake Town", city: "Fake City", postcode: "FA1 2KE", isDefault: false },
    { name: "John Deez", addressLine1: "123 Fake Street", addressLine2: "Fake Town", city: "Fake City", postcode: "FA1 2KE", isDefault: false },
    { name: "John Deez", addressLine1: "123 Fake Street", addressLine2: "Fake Town", city: "Fake City", postcode: "FA1 2KE", isDefault: false },
    { name: "John Deez", addressLine1: "123 Fake Street", addressLine2: "Fake Town", city: "Fake City", postcode: "FA1 2KE", isDefault: false },
  ];

  return (
    <section id="addresses">
      <div className="container min-vh-100 my-5 p-5">
        <h2 className="fw-bold mb-0">My Addresses</h2>

        <div className="row mt-5">
          {/* Add address */}
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

          {/* Addresses */}
          {sampleAddresses.map((address, index) => (
            <Address
              key={index}
              name={address.name}
              addressLine1={address.addressLine1}
              addressLine2={address.addressLine2}
              city={address.city}
              postcode={address.postcode}
              isDefault={address.isDefault}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Addresses;
