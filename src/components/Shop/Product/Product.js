import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ image, name, price }) => {
  return (
    <Link to="/shop/product-page" className="text-decoration-none">
      <div className="my-3">
        <div className="card text-start text-secondary border-0 rounded-0">
          <img src={image} className="card-image-top" alt={name} />
          <div className="card-body p-0">
            <h4 className="card-text fw-bold mt-3">{name}</h4>
            <h5 className="card-text">£{price}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
