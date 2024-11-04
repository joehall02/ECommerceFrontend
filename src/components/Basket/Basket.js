import React from "react";
import "./Basket.css";
import Product from "./Product/Product";

const Basket = ({ isVisible, onClose }) => {
  return (
    <div className={`offcanvas offcanvas-end ${isVisible ? "show" : ""} bg-dark text-white`} style={{ visibility: isVisible ? "visible" : "hidden" }}>
      {/* Ensure the offcanvas is visible when the isVisible prop is true */}
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Your Basket</h5>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
      </div>
      <div className="offcanvas-body d-flex flex-column">
        {/* List of Products */}
        <ul className="mb-4 p-0">
          {/* Grey separator */}
          <div className="flex-grow-1 border-top border-secondary"></div>
          <Product image="https://loremflickr.com/75/75" name="Product 1" price="10.00" quantity="3" />
          <Product image="https://loremflickr.com/75/75" name="Product 2" price="10.00" quantity="3" />
          <Product image="https://loremflickr.com/75/75" name="Product 3" price="10.00" quantity="3" />
          <Product image="https://loremflickr.com/75/75" name="Product 4" price="10.00" quantity="3" />
          <Product image="https://loremflickr.com/75/75" name="Product 4" price="10.00" quantity="3" />
          <Product image="https://loremflickr.com/75/75" name="Product 4" price="10.00" quantity="3" />
        </ul>

        {/* Checkout Button */}
        <button className="btn btn-success rounded-0 mt-auto">Checkout</button>
      </div>
    </div>
  );
};

export default Basket;
