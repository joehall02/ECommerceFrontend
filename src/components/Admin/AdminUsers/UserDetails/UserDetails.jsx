import React, { useState, useEffect } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../../../api/user";
import { getUsersOrders } from "../../../../api/order";
import "../../../../App.css";
import Error from "../../../Error/Error";
import Pagination from "../../../Pagination/Pagination";
import Order from "./Order/Order";

const UserDetails = () => {
  const { user_id } = useParams();

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserById(user_id);

      if (response.success) {
        setError("");
        setUser(response.response);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [user_id]);

  useEffect(() => {
    const fetchData = async () => {
      setOrderLoading(true);

      const response = await getUsersOrders(user_id, currentPage);

      if (response.success) {
        setOrderError("");
        setOrders(response.response.orders);
        setTotalPages(response.response.total_pages);
        setCurrentPage(response.response.current_page);
        setTotalOrders(response.response.total_orders);
      } else {
        setOrderError(response.message);
      }
      setOrderLoading(false);
    };

    fetchData();
  }, [currentPage, user_id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <section id="user-details" className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="container my-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">
            User Id <span className="text-danger">#{user_id}</span>
          </h2>
          <Link to={"/admin/users"}>Go back</Link>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : (
          <>
            {/* User details */}
            <div className="card mb-5">
              <div className="card-header">
                <h5 className="fw-bold my-auto">User Details</h5>
              </div>
              <div className="card-body py-4">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <p className="card-text">
                      <span className="fw-bold">Full Name:</span> {user.full_name}
                      <br />
                      <span className="fw-bold">Email:</span> {user.email ? user.email : "N/A"}
                      <br />
                      <span className="fw-bold">Stripe Customer Id:</span> {user.stripe_customer_id ? user.stripe_customer_id : "N/A"}
                      <br />
                      <span className="fw-bold">Created at: </span>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                        : "N/A"}
                      <br />
                      <span className="fw-bold">Role:</span> {user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {orders.length > 0 && <small>{totalOrders} Orders Total</small>}

            {/* Orders */}
            {orderLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status" />
              </div>
            ) : orders.length > 0 ? (
              <>
                {orders.map((order, index) => (
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
                ))}

                {/* Pagination */}
                {orders.length > 0 && (
                  <div className="mt-auto">
                    <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                  </div>
                )}
              </>
            ) : (
              <p>No orders found</p>
            )}

            {/* Error message */}
            {error && <Error message={error} setError={setError} />}

            {/* Order error message */}
            {orderError && <Error message={orderError} setError={setOrderError} />}
          </>
        )}
      </div>
    </section>
  );
};

export default UserDetails;
