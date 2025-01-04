import React, { useContext } from "react";
import "./Basket.css";
import Product from "./Product/Product";
import { BasketContext } from "../../contexts/BasketContext";

const Basket = ({ isVisible, onClose }) => {
  // Get the cart products, loading state, and error message from the BasketContext
  const { cartProducts, cartLoading, cartError } = useContext(BasketContext);

  return (
    <div className={`offcanvas offcanvas-end ${isVisible ? "show" : ""} bg-dark text-white`} style={{ visibility: isVisible ? "visible" : "hidden" }}>
      {/* Ensure the offcanvas is visible when the isVisible prop is true */}
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Your Basket</h5>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
      </div>
      <div className="offcanvas-body d-flex flex-column">
        {cartLoading ? (
          <div className="d-flex justify-content-center">
            <div class="spinner-border" role="status" />
          </div>
        ) : cartError ? (
          <p>{cartError}</p>
        ) : cartProducts.length > 0 ? (
          <>
            {/* List of Products */}
            <ul className="mb-4 p-0">
              {/* Grey separator */}
              <div className="flex-grow-1 border-top border-secondary"></div>
              {cartProducts.map((product, index) => (
                <Product
                  key={index}
                  image_path={product.product.image_path}
                  name={product.product.name}
                  category_name={product.product.category_name}
                  price={product.product.price}
                  quantity={product.cart_product.quantity}
                  cart_product_id={product.cart_product.id}
                />
              ))}
            </ul>

            {/* Checkout Button */}
            <button className="btn btn-success rounded-0 mt-auto">Checkout</button>
          </>
        ) : (
          <p>Your basket is empty</p>
        )}
      </div>
    </div>
  );
};

export default Basket;
