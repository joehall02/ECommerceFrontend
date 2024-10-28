import "./Home.css";
import React from "react";

function FeaturedProducts() {
  return (
    <section id="featured-products">
      <div className="container">
        <div className="product">
          <img src="https://loremflickr.com/320/240" alt="Product" />
          <h3>Product 1</h3>
          <p>$9.99</p>
        </div>
        <div className="product">
          <img src="https://loremflickr.com/320/240" alt="Product" />
          <h3>Product 2</h3>
          <p>$9.99</p>
        </div>
        <div className="product">
          <img src="https://loremflickr.com/320/240" alt="Product" />
          <h3>Product 3</h3>
          <p>$9.99</p>
        </div>
        <div className="product">
          <img src="https://loremflickr.com/320/240" alt="Product" />
          <h3>Product 4</h3>
          <p>$9.99</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
