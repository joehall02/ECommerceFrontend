import React from "react";
import "./FeaturedProducts.css";
import Product from "./Product/Product";

function FeaturedProducts() {
  return (
    <section id="featured-products">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-3">
            <Product image="https://loremflickr.com/320/450" name="Product 1" category="Category 1" price="1.00" />
          </div>
          <div className="col-12 col-lg-3">
            <Product image="https://loremflickr.com/320/450" name="Product 2" category="Category 2" price="2.00" />
          </div>
          <div className="col-12 col-lg-3">
            <Product image="https://loremflickr.com/320/450" name="Product 3" category="Category 3" price="3.00" />
          </div>
          <div className="col-12 col-lg-3">
            <Product image="https://loremflickr.com/320/450" name="Product 4" category="Category 4" price="4.00" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
