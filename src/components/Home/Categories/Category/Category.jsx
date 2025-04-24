import React from "react";
import "./Category.css";

const Product = ({ image, name }) => {
  return (
    <div className="category-shadow my-2">
      <div className="card text-center text-secondary border-0 rounded-0">
        <img src={image} className="card-image-top" alt={name} />
        <div className="card-body">
          <h3 className="cart-title fw-bold mt-3">Shop {name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
