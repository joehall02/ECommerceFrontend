import React, { useState } from "react";
import "./Order.css";
import { Link } from "react-router-dom";

const Order = ({ orderDate, totalPrice, status, products, address, payment }) => {
  const [infoToggle, setInfoToggle] = useState(false);

  const handleInfoToggle = () => {
    setInfoToggle(!infoToggle);
    console.log(infoToggle);
  };

  return (
    // Order component
    <div className="col-12 col-lg-6 col-xxl-4 mb-5 order">
      <div className="card h-100">
        {/* Order info */}
        <div className={`card-body ${infoToggle ? "order-info-open" : "order-info-closed"}`}>
          {/* Top order info */}
          <div className="d-flex justify-content-between">
            <small className="card-text">
              <span className="fw-bold">Order Placed:</span>
              <br />
              {orderDate}
            </small>
            <small className="card-text">
              <span className="fw-bold">Total:</span>
              <br />
              {totalPrice}
            </small>
            <small className="card-text">
              <span className="fw-bold">Status:</span>
              <br />
              {status}
            </small>
            <small className="card-text fw-bold d-flex align-items-center cursor-pointer" onClick={handleInfoToggle}>
              <u>Order Details</u> <i className={`bi ${infoToggle ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}></i>
            </small>
          </div>

          {/* Order details */}

          <div className="d-flex justify-content-between mt-3">
            <small className="card-text">
              <span className="fw-bold">Delivery Address:</span>
              <br />
              {address.addressLine1}
              <br />
              {address.addressLine2}
              <br />
              {address.city}
              <br />
              {address.postcode}
            </small>
            <small className="card-text">
              <span className="fw-bold">Payment Method:</span>
              <br />
              {payment}
            </small>
          </div>
        </div>

        {/* Order products */}
        <div className="card-body card-products">
          {products.map((product, index) => (
            <Link to={"/shop/product-page"} key={index} className="d-flex align-items-center mb-2 p-1 text-decoration-none text-dark order-product">
              <img src={product.image} alt={product.name} />
              <div className="d-flex flex-column ms-3">
                <span className="fw-bold">{product.name}</span>
                <span>Quantity: {product.quantity}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
