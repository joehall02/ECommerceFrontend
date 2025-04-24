import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import OrdersGraph from "./OrdersGraph/OrdersGraph";
import Error from "../../Error/Error";
import { getDashboardData } from "../../../api/auth";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDashboardData();

      if (response.success) {
        setError("");
        setDashboardData(response.response);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="admin-dashboard" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <Error message={error} setError={setError} />
        ) : dashboardData.total_users ? (
          <>
            <h2 className="fw-bold mt-3">Dashboard</h2>
            <div className="row mt-5 justify-content-between">
              <div className="col-6 col-md-4 col-xl-3 mb-2">
                <div className="card bg-light p-2 text-center">
                  <h5 className="fw-bold">User Accounts</h5>
                  <p>{dashboardData.total_users}</p>
                </div>
              </div>
              <div className="col-6 col-md-4 col-xl-3 mb-2">
                <div className="card bg-light p-2 text-center">
                  <h5 className="fw-bold">Ongoing Orders:</h5>
                  <p>{dashboardData.ongoing_orders}</p>
                </div>
              </div>
              <div className="col-6 col-md-4 col-xl-3 mb-2">
                <div className="card bg-light p-2 text-center">
                  <h5 className="fw-bold">Orders Overall:</h5>
                  <p>{dashboardData.orders_overall}</p>
                </div>
              </div>
              <div className="col-6 col-md-4 col-xl-3 mb-2">
                <div className="card bg-light p-2 text-center">
                  <h5 className="fw-bold">Revenue:</h5>
                  <p>£{dashboardData.total_revenue}</p>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <h4 className="fw-bold">Sales Over Time</h4>
              <OrdersGraph graphData={dashboardData.graph_data} />
            </div>
          </>
        ) : (
          <Error message="No data available" setError={setError} />
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
