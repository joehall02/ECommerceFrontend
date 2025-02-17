import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import "./AdminOrders.css";
import { getAdminOrders } from "../../../api/order";
import Pagination from "../../Pagination/Pagination";
import Error from "../../Error/Error";

const AdminOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const handleStatusSelect = (item) => {
    setSelectedStatus(item);

    // Reset the current page to 1 when the sort by option is changed
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: currentPage,
      };

      if (selectedStatus) {
        params.status = selectedStatus;
      }

      const response = await getAdminOrders(params);

      if (response.success) {
        setError("");
        setOrders(response.response.orders);
        setTotalPages(response.response.total_pages);
        setCurrentPage(response.response.current_page);
        setTotalOrders(response.response.total_orders);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [currentPage, selectedStatus]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="admin-orders" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container flex-grow-1 d-flex flex-column my-5 py-5 min-vh-100">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold mt-4">Customer Orders</h2>

          {/* Dropdown */}
          <div className="d-flex column align-items-center">
            <div className="btn-group w-100">
              <button className="btn btn-outline-secondary dropdown-toggle rounded-0" data-bs-toggle="dropdown">
                {selectedStatus || "Select Status"}
              </button>
              <ul className="dropdown-menu w-100">
                <li>
                  <button className="dropdown-item" onClick={() => handleStatusSelect("")}>
                    Default
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleStatusSelect("Processing")}>
                    Processing
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleStatusSelect("Shipped")}>
                    Shipped
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleStatusSelect("Delivered")}>
                    Delivered
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {orders.length > 0 && <small>{totalOrders} Orders Total</small>}

        {/* Loading */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <Error message={error} setError={setError} />
        ) : orders.length > 0 ? (
          // Order Table
          <div className="d-flex mt-5">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="w-5">
                    #
                  </th>
                  <th scope="col" className="w-15">
                    Customer
                  </th>
                  <th scope="col" className="w-15">
                    Status
                  </th>
                  <th scope="col" className="w-15">
                    Date
                  </th>
                  <th scope="col" className="w-15">
                    Total
                  </th>
                  <th scope="col" className="w-35 text-end actions-header">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <th scope="row" className="w-5">
                      {order.id}
                    </th>
                    <td className="w-15">{order.full_name}</td>
                    <td className="w-15">{order.status}</td>
                    <td className="w-15">{order.order_date}</td>
                    <td className="w-15">£{order.total_price}</td>
                    <td className="w-35 text-end">
                      <Link to={`/admin/orders/order-details/${order.id}`} className="btn btn-dark rounded-0 btn-sm me-2">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No orders found</p>
        )}

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

export default AdminOrders;
