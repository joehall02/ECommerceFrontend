import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 text-white bg-dark" style={{ width: "250px" }}>
      <ul className="nav flex-column py-5 mb-auto">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link text-light fw-bold my-2 d-flex justify-content-between align-items-center admin-sidebar-link">
            Dashboard <i className="bi bi-caret-right-fill"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/categories" className="nav-link text-light fw-bold my-2 d-flex justify-content-between align-items-center admin-sidebar-link">
            Categories <i className="bi bi-caret-right-fill"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/products" className="nav-link text-light fw-bold my-2 d-flex justify-content-between align-items-center admin-sidebar-link">
            Products <i className="bi bi-caret-right-fill"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/orders" className="nav-link text-light fw-bold my-2 d-flex justify-content-between align-items-center admin-sidebar-link">
            Orders <i className="bi bi-caret-right-fill"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/users" className="nav-link text-light fw-bold my-2 d-flex justify-content-between align-items-center admin-sidebar-link">
            Users <i className="bi bi-caret-right-fill"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
