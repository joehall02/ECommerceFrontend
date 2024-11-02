import React, { useState } from "react";
import "./Shop.css";
import Product from "./Product/Product";

function Shop() {
  const [selectedItem, setSelectedItem] = useState("Name (A-Z)");

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <section id="shop">
      <div className="container min-vh-100 my-5 py-5">
        {/* Category heading and sort by button */}
        <div className="d-flex justify-content-between pb-3">
          <h2 className="text-start text-dark fw-bold mb-0">All Product</h2>
          <div className="d-flex column align-items-center">
            <p className="mb-0 me-3">Sort By</p>
            <div className="btn-group">
              <button className="btn btn-outline-secondary dropdown-toggle rounded-0" data-bs-toggle="dropdown">
                {selectedItem}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Name (A-Z)")}>
                    Name (A-Z)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Name (Z-A)")}>
                    Name (Z-A)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Price (Low to High)")}>
                    Price (Low to High)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Price (High to Low)")}>
                    Price (High to Low)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="row justify-content-start">
          <div className="col-12 col-lg-4">
            <Product image="https://loremflickr.com/320/320" name="Product 1" price="10.00" />
          </div>
          <div className="col-12 col-lg-4">
            <Product image="https://loremflickr.com/320/320" name="Product 2" price="10.00" />
          </div>
          <div className="col-12 col-lg-4">
            <Product image="https://loremflickr.com/320/320" name="Product 3" price="10.00" />
          </div>
          <div className="col-12 col-lg-4">
            <Product image="https://loremflickr.com/320/320" name="Product 3" price="10.00" />
          </div>
          <div className="col-12 col-lg-4">
            <Product image="https://loremflickr.com/320/320" name="Product 3" price="10.00" />
          </div>
          <div className="col-12 col-lg-4">
            <Product image="https://loremflickr.com/320/320" name="Product 3" price="10.00" />
          </div>
          <div className="col-12 col-lg-4">
            <Product image="https://loremflickr.com/320/320" name="Product 3" price="10.00" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
