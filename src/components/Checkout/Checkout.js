import React, { useState, useEffect, useContext, useRef } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import Product from "../Checkout/Product/Product";
import AddressDetails from "./AddressDetails/AddressDetails";
import { getStripeCheckoutSession } from "../../api/order";
import { loadStripe } from "@stripe/stripe-js";
import Error from "../Error/Error";

const Checkout = () => {
  // Get the cart products, loading state, and error message from the BasketContext
  const { cartProducts, cartLoading, cartError, setCartError, fetchCartProducts } = useContext(BasketContext);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const [address, setAddress] = useState({
    full_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    postcode: "",
  });
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Use a ref to track if the fetchCartProducts has been called
  const fetchCartProductsRef = useRef(false);

  // Fetch the cart products when the component mounts
  useEffect(() => {
    if (!fetchCartProductsRef.current) {
      fetchCartProducts();
      fetchCartProductsRef.current = true;
    }
  }, [fetchCartProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleCheckout = async () => {
    // Load Stripe.js
    const stripe = await stripePromise;

    // Create a JSON object for the address data, excluding the is_default property
    const { is_default, id, ...addressData } = address;

    setButtonDisabled(true);

    // Get the Stripe checkout session
    const response = await getStripeCheckoutSession(addressData);

    if (response.success) {
      const result = await stripe.redirectToCheckout({
        sessionId: response.response.session_id,
      });

      if (result.error) {
        setError(result.error.message);
        setButtonDisabled(false);
      }
    } else {
      setError(response.message);
      setButtonDisabled(false);
    }
  };

  return (
    <section id="checkout">
      <div className="container min-vh-100 my-5 py-5">
        <div className="d-flex flex-column justify-content-between flex-lg-row">
          {/* Details */}
          <div className="col-lg-5 mb-5 mb-lg-0 d-flex">
            <AddressDetails address={address} setAddress={setAddress} />
          </div>

          {/* Order summary */}
          <div className="col-lg-5">
            <div className="col-12">
              <h2 className="fw-bold mb-0">Items</h2>

              <div className="d-flex flex-column">
                {cartLoading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" />
                  </div>
                ) : cartError ? (
                  <Error message={error} setError={setCartError} />
                ) : cartProducts.length > 0 ? (
                  <>
                    {/* List of Products */}
                    <ul className="mb-4 p-0" style={{ height: "50vh", overflowY: "auto" }}>
                      {/* Grey separator */}
                      <div className="flex-grow-1 border-top border-secondary"></div>
                      {cartProducts.map((product, index) => (
                        <Product
                          key={index}
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
                    </ul>

                    {/* Checkout Button */}
                    <button className="btn btn-success rounded-0" onClick={handleCheckout} disabled={!address.full_name || buttonDisabled}>
                      Checkout
                    </button>
                  </>
                ) : (
                  <p>Your basket is empty</p>
                )}
              </div>
            </div>

            {/* Error message */}
            {error && <Error message={error} setError={setError} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
