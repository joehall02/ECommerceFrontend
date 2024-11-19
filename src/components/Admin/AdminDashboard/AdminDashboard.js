import React from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import OrdersGraph from "./OrdersGraph/OrdersGraph";

const AdminDashboard = () => {
  return (
    <section id="admin-dashboard" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5">
        <h2 className="fw-bold mt-4">Dashboard</h2>
        <div className="row mt-5 justify-content-between">
          <div className="col-6 col-md-4 col-xl-3 mb-2">
            <div className="card bg-light p-2 text-center">
              <h5 className="fw-bold">User Accounts</h5>
              <p>123</p>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl-3 mb-2">
            <div className="card bg-light p-2 text-center">
              <h5 className="fw-bold">Ongoing Orders:</h5>
              <p>123</p>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl-3 mb-2">
            <div className="card bg-light p-2 text-center">
              <h5 className="fw-bold">Orders Overall:</h5>
              <p>123</p>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl-3 mb-2">
            <div className="card bg-light p-2 text-center">
              <h5 className="fw-bold">Revenue:</h5>
              <p>£123</p>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <h4 className="fw-bold">Sales Over Time</h4>
          <OrdersGraph />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
