import React from "react";
import "./Product.css";

const Product = ({ image, name, category, price }) => {
  return (
    <div className="my-3">
      <div className="card text-start text-secondary rounded-0">
        <img src={"https://storage.googleapis.com/" + image} className="img-fluid h-100" alt={name} />
        <div className="card-body">
          <h4 className="card-text fw-bold mt-3">{name}</h4>
          <h5 className="card-text">{category}</h5>
          <h5 className="card-text">£{price}</h5>
        </div>
      </div>
    </div>
  );
};

export default Product;
