import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import "./AdminOrders.css";
import { getAdminOrders } from "../../../api/order";

const AdminOrders = () => {
  const [selectedItem, setSelectedItem] = useState("Processing");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminOrders();

      if (response.success) {
        setError("");
        setOrders(response.orders);
        setLoading(false);
      } else {
        setError(response.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="admin-orders" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold mt-4">Customer Orders</h2>

          {/* Dropdown */}
          <div className="d-flex column align-items-center">
            <p className="mb-0 me-3">Sort By</p>
            <div className="btn-group">
              <button className="btn btn-outline-secondary dropdown-toggle rounded-0" data-bs-toggle="dropdown">
                {selectedItem}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Processing")}>
                    Processing
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Shipped")}>
                    Shipped
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Delivered")}>
                    Delivered
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <p>{error}</p>
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
      </div>
    </section>
  );
};

export default AdminOrders;
