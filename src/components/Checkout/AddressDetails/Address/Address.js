import React from "react";
import "./Address.css";

const Address = ({ address, setAddress, setIsChanging }) => {
  return (
    <>
      <div
        className="d-flex align-items-center my-1 address-hover"
        onClick={() => {
          setAddress(address);
          setIsChanging(false);
        }}
      >
        <div className="d-flex flex-column">
          <span>{address.full_name}</span>
          <span>{address.address_line_1}</span>
          <span>{address.address_line_2}</span>
          <span>{address.city}</span>
          <span>{address.postcode}</span>
        </div>
      </div>

      {/* Grey separator */}
      <div className="flex-grow-1 border-top border-secondary"></div>
    </>
  );
};

export default Address;
