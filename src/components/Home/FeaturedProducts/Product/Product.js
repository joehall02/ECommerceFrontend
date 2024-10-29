import React from "react";
import "./Product.css";

function Product({ image, name, category, price }) {
  return (
    <div className="custom-border my-3">
      <div className="card p-2 text-center text-white bg-transparent border-0">
        <img src={image} className="card-image-top image-shadow" alt={name} />
        <h3 className="cart-title fw-bold mt-3">{name}</h3>
        <p className="card-text">{category}</p>
        <p className="card-text">£{price}</p>
        <div className="d-flex justify-content-center">
          <button className="btn w-75 fw-bold shop-button fs-5">Add to basket</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
