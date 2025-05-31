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
        <div className="d-flex flex-column w-100">
          <span className="text-truncate">{address.full_name}</span>
          <span className="text-truncate">{address.address_line_1}</span>
          <span className="text-truncate">{address.address_line_2}</span>
          <span className="text-truncate">{address.city}</span>
          <span className="text-truncate">{address.postcode}</span>
        </div>
      </div>

      {/* Grey separator */}
      <div className="border-top border-secondary"></div>
    </>
  );
};

export default Address;
