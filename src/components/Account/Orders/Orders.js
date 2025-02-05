import React, { useState, useEffect } from "react";
import Order from "./Order/Order";
import { getOrders } from "../../../api/order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrders();

      if (response.success) {
        setError("");
        setOrders(response.response);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  return (
    <section id="orders">
      <div className="container min-vh-100 my-5 p-5">
        <h2 className="fw-bold mb-0">My Orders</h2>

        {/* Orders */}
        <div className="row mt-5">
          {/* Loading */}
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status" />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : orders.length > 0 ? (
            orders.map((order, index) => (
              <Order
                key={index}
                order_date={order.order.order_date}
                total_price={order.order.total_price}
                status={order.order.status}
                full_name={order.order.full_name}
                address_line_1={order.order.address_line_1}
                address_line_2={order.order.address_line_2}
                city={order.order.city}
                postcode={order.order.postcode}
                order_number={order.order.id}
                products={order.order_items}
              />
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;
