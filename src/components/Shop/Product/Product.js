import React, { useState } from "react";
import "./Product.css";

const Product = ({ image, name, category, price }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="my-3">
      <div className="card text-start text-secondary rounded-0">
        {/* Placeholder using Bootstrap classes */}
        <div className={`bg-light d-flex justify-content-center align-items-center ${imageLoaded ? "d-none" : ""}`} style={{ width: "100%", height: "250px" }}>
          <span className="text-muted">Loading...</span>
        </div>
        {/* Image */}
        <img src={"https://storage.googleapis.com/" + image} className={`img-fluid h-100 ${imageLoaded ? "" : "d-none"}`} alt={name} onLoad={() => setImageLoaded(true)} />
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
