import React from "react";
import "./Category.css";

function Product({ image, name, text }) {
  return (
    <div className="category-shadow my-2">
      <div className="card text-center text-secondary border-0 rounded-0">
        <img src={image} className="card-image-top" alt={name} />
        <div className="card-body">
          <h3 className="cart-title fw-bold mt-3">{name}</h3>
          <p className="card-text">{text}</p>
          <div className="d-flex justify-content-center">
            <button className="btn w-75 fw-bold shop-button fs-5">Shop Category</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
