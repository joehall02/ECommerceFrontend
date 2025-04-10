import React, { useState } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import noImageAvailable from "../../../../../assets/no-image-available.png";

const Order = ({ order_date, total_price, status, full_name, address_line_1, address_line_2, city, postcode, order_number, products }) => {
  const [infoToggle, setInfoToggle] = useState(false);

  const handleInfoToggle = () => {
    setInfoToggle(!infoToggle);
  };

  return (
    // Order component
    <div className="col-12 mb-5 order">
      <div className="card h-100">
        {/* Order info */}
        <div className={`card-body ${infoToggle ? "order-info-open" : "order-info-closed"}`}>
          {/* Top order info */}
          <div className="d-flex justify-content-between">
            <small className="card-text">
              <span className="fw-bold">Order Placed:</span>
              <br />
              {order_date}
            </small>
            <small className="card-text">
              <span className="fw-bold">Total:</span>
              <br />£{total_price}
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

          <div className="d-flex mt-3 border-top border-dark pt-3">
            <small className="card-text me-auto">
              <span className="fw-bold">Delivery Address:</span>
              <br />
              {full_name}
              <br />
              {address_line_1}
              {address_line_2 && (
                <>
                  <br />
                  {address_line_2}
                </>
              )}
              <br />
              {city}
              <br />
              {postcode}
            </small>
            {/* <small className="card-text">
              <span className="fw-bold">Payment Method:</span>
              <br />
              {payment}
            </small> */}
            <small className="card-text me-auto">
              <span className="fw-bold">Order Number:</span>
              <br />
              {order_number}
            </small>
          </div>
        </div>

        {/* Order products */}
        <div className="card-body card-products">
          {products.map((product, index) => (
            <Link to={`/shop/product-page/${product.product_id}`} key={index} className="d-flex align-items-center mb-2 p-1 text-decoration-none text-dark order-product">
              <img src={product.product_image ? `https://storage.googleapis.com/${product.product_image}` : noImageAvailable} alt={product.name} style={{ width: "75px", height: "75px" }} />
              <div className="d-flex flex-column ms-3">
                <span className="fw-bold">{product.name}</span>
                <span>Price: £{product.price}</span>
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
