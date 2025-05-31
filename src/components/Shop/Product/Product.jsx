import React, { useState } from "react";
import "./Product.css";

const Product = ({ image, name, category, price }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="my-3">
      <div className="card text-start text-secondary rounded-0">
        {/* 4:3 aspect ratio container */}
        <div className="ratio ratio-4x3 bg-light">
          {!image || !imageLoaded ? (
            <div className="d-flex justify-content-center align-items-center w-100 h-100">
              <span className="text-muted">Loading...</span>
            </div>
          ) : null}
          {image && (
            <img
              src={"https://storage.googleapis.com/" + image}
              className={`img-fluid w-100 h-100 position-absolute top-0 start-0 ${imageLoaded ? "" : "d-none"}`}
              alt={name}
              onLoad={() => setImageLoaded(true)}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="card-body">
          <h4 className="card-text fw-bold mt-3 text-truncate">{name}</h4>
          <h5 className="card-text">{category}</h5>
          <h5 className="card-text">£{price}</h5>
        </div>
      </div>
    </div>
  );
};

export default Product;
