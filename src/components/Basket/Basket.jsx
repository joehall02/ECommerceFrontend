import React, { useContext } from "react";
import "./Basket.css";
import Product from "./Product/Product";
import { BasketContext } from "../../contexts/BasketContext";
import { Link } from "react-router-dom";
import Error from "../Error/Error";

const Basket = ({ isVisible, onClose }) => {
  // Get the cart products, loading state, and error message from the BasketContext
  const { cartProducts, cartLoading, cartError, setCartError } = useContext(BasketContext);

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
            <div className="spinner-border" role="status" />
          </div>
        ) : cartError ? (
          <Error message={cartError} setError={setCartError} />
        ) : cartProducts.length > 0 ? (
          <>
            {/* List of Products */}
            <ul className="mb-4 p-0 h-100" style={{ maxHeight: "100vh", overflowY: "auto" }}>
              {/* Grey separator */}
              <div className="flex-grow-1 border-top border-secondary"></div>
              {cartProducts.map((product) => (
                <Product
                  key={product.cart_product.id}
                  image_path={product.product.image_path}
                  name={product.product.name}
                  category_name={product.product.category_name}
                  price={product.product.price}
                  stock={product.product.stock}
                  quantity={product.cart_product.quantity}
                  cart_product_id={product.cart_product.id}
                  product_id={product.product.id}
                />
              ))}
              {/* <Product image_path="https://loremflickr.com/320/320" name="Product Name" category_name="Category" price="£10.00" quantity="1" cart_product_id="1" product_id="1" />
              <Product image_path="https://loremflickr.com/320/320" name="Product Name" category_name="Category" price="£10.00" quantity="1" cart_product_id="1" product_id="1" />
              <Product image_path="https://loremflickr.com/320/320" name="Product Name" category_name="Category" price="£10.00" quantity="1" cart_product_id="1" product_id="1" />
              <Product image_path="https://loremflickr.com/320/320" name="Product Name" category_name="Category" price="£10.00" quantity="1" cart_product_id="1" product_id="1" />
              <Product image_path="https://loremflickr.com/320/320" name="Product Name" category_name="Category" price="£10.00" quantity="1" cart_product_id="1" product_id="1" />
              <Product image_path="https://loremflickr.com/320/320" name="Product Name" category_name="Category" price="£10.00" quantity="1" cart_product_id="1" product_id="1" /> */}
            </ul>

            {/* Checkout Button */}
            <Link to={"/checkout"} className="btn btn-success rounded-0 mt-auto text-decoration-none" onClick={onClose}>
              Checkout
            </Link>
          </>
        ) : (
          <p>Your basket is empty</p>
        )}
      </div>
    </div>
  );
};

export default Basket;
