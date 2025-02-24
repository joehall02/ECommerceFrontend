import React, { useContext, useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { BasketContext } from "../../../../contexts/BasketContext";
import { addProductToCart } from "../../../../api/cart";
import Error from "../../../Error/Error";

const Product = ({ id, image, name, category, price }) => {
  const { toggleBasketVisibility, fetchCartProducts } = useContext(BasketContext);

  const [error, setError] = useState("");

  const handleAddToCart = (product_id) => async () => {
    // Create a JSON object for product data
    const productData = {
      quantity: 1,
    };

    const response = await addProductToCart(product_id, productData);

    if (response.success) {
      toggleBasketVisibility(); // Show the basket
      fetchCartProducts(); // Fetch the cart products
      setError("");
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="custom-border my-3 py-3 h-100">
      <div className="card p-2 text-center text-white bg-transparent border-0 d-flex flex-column h-100">
        {/* Ensure the Link does not break the layout */}
        <Link to={`/shop/product-page/${id}`} className="text-decoration-none d-block flex-grow-1 text-white">
          <img src={`https://storage.googleapis.com/${image}`} className="card-image-top image-shadow w-100" alt={name} />

          {/* Separate clickable title to avoid wrapping issues */}
          <div className="mt-3">
            <h3 className="cart-title fw-bold">{name}</h3>

            <p className="card-text">{category}</p>
            <p className="card-text">£{price}</p>
          </div>
        </Link>

        {/* Make sure the button stays at the bottom */}
        <div className="d-flex justify-content-center mt-auto">
          <button className="btn w-75 fw-bold shop-button fs-5" onClick={handleAddToCart(id)}>
            Add to basket
          </button>
        </div>

        {/* Error Message */}
        {error && <Error message={error} setError={setError} />}
      </div>
    </div>
  );
};

export default Product;
