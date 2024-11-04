import React, { useState } from "react";
import "./Product.css";

const Product = ({ image, name, price, quantity }) => {
  const [selectedItem, setSelectedItem] = useState(quantity);

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <li className="d-flex align-items-center my-3">
        {/* Product image */}
        <img src={image} alt={name} />

        {/* Product details */}
        <div className="d-flex flex-column ms-3">
          {name}
          <span className="">£{price}</span>
        </div>

        {/* Dropdown */}
        <div className="btn-group ms-auto">
          <button className="btn btn-outline-light rounded-0" data-bs-toggle="dropdown">
            {selectedItem} <i className="bi bi-caret-down-fill"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("1")}>
                1
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("2")}>
                2
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("3")}>
                3
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("4")}>
                4
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("5")}>
                5
              </a>
            </li>
          </ul>
        </div>

        {/* Remove button */}
        <button className="btn btn-danger rounded-0 ms-3">
          <i className="bi bi-trash"></i>
        </button>
      </li>

      {/* Grey separator */}
      <div className="flex-grow-1 border-top border-secondary"></div>
    </>
  );
};

export default Product;
