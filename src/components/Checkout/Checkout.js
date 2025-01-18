import React, { useEffect, useContext } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import Product from "../Checkout/Product/Product";
import AddressDetails from "./AddressDetails/AddressDetails";

const Checkout = () => {
  // Get the cart products, loading state, and error message from the BasketContext
  const { cartProducts, cartLoading, cartError } = useContext(BasketContext);

  // const address = {
  //   name: "John Doe",
  //   addressLine1: "123 Fake Street",
  //   addressLine2: "Apt 2",
  //   city: "London",
  //   postcode: "E1 4AB",
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <section id="checkout">
      <div className="container min-vh-100 my-5 py-5">
        <div className="d-flex flex-column justify-content-between flex-lg-row">
          {/* Details */}
          <div className="col-lg-5 mb-5 mb-lg-0 d-flex">
            <AddressDetails />
          </div>

          {/* Order summary */}
          <div className="col-lg-5">
            <div className="col-12">
              <h2 className="fw-bold mb-0">Items</h2>

              <div className="d-flex flex-column">
                {cartLoading ? (
                  <div className="d-flex justify-content-center">
                    <div class="spinner-border" role="status" />
                  </div>
                ) : cartError ? (
                  <p>{cartError}</p>
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
                    <button className="btn btn-success rounded-0">Checkout</button>
                  </>
                ) : (
                  <p>Your basket is empty</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
