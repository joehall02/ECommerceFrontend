import React, { useState, useEffect } from "react";
import Order from "./Order/Order";
import { getOrders } from "../../../api/order";
import Pagination from "../../Pagination/Pagination";
import Error from "../../Error/Error";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrders(currentPage);

      if (response.success) {
        setError("");
        setOrders(response.response.orders);
        setTotalPages(response.response.total_pages);
        setCurrentPage(response.response.current_page);
        setTotalOrders(response.response.total_orders);
      } else {
        if (!(response.message === "No orders found")) {
          setError(response.message);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <section id="orders" className="d-flex min-vh-100">
      <div className="container flex-grow-1 d-flex flex-column my-5 p-5">
        <h2 className="fw-bold mb-0">My Orders</h2>

        {orders.length > 0 && <small>{totalOrders} Orders Total</small>}

        {/* Orders */}
        <div className="row mt-5">
          {/* Loading */}
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status" />
            </div>
          ) : error ? (
            <Error message={error} setError={setError} />
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

        {/* Pagination */}
        {orders.length > 0 && (
          <div className="mt-auto">
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
