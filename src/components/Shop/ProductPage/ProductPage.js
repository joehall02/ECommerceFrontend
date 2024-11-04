import React, { useState } from "react";
import "./ProductPage.css";
import "../../../App.css";

const ProductPage = () => {
  const [selectedItem, setSelectedItem] = useState("1");

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <section id="product-page">
      <div className="container min-vh-100 d-flex align-items-center my-5 my-lg-0 py-5">
        <div className="row">
          {/* Image */}
          <div className="col-12 col-lg-6 mb-5 mb-lg-0">
            <img src="https://loremflickr.com/500/700" className="img-fluid" alt="Product" />
          </div>

          {/* Product details */}
          <div className="col-12 col-lg-6 d-flex justify-content-center flex-column">
            <div className="mt-auto">
              <h2 className="fw-bold">Product Name</h2>
              <h3>Category Name</h3>
              <h4 className="mb-5">£9.99</h4>
              <div className="">
                <h4>About this item</h4>
                <p className="mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec nisl eget massa maximus molestie. Curabitur iaculis turpis elit, quis luctus felis volutpat sed. Nulla vehicula
                  pellentesque ligula, volutpat bibendum ligula pretium eget. Praesent at nisi sed augue varius varius nec eu erat. Nulla porta neque non ante facilisis viverra.
                </p>
              </div>
            </div>

            {/* Quantity dropdown and add to basket button */}
            <div className="d-flex justify-content-between justify-content-lg-start mt-auto">
              <div className="btn-group me-3">
                <button className="btn btn-outline-secondary dropdown-toggle rounded-0" data-bs-toggle="dropdown">
                  Quantity: {selectedItem}
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
              <button className="btn shop-button px-5 fs-5">Add to Basket</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
