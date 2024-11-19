import React from "react";
import { Link } from "react-router-dom";
import "./Account.css";

const Account = () => {
  return (
    <div className="dropdown">
      <Link className="btn btn-link p-0" data-bs-toggle="dropdown">
        <i className="bi bi-person-fill"></i>
      </Link>

      <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
        <li>
          <Link to={"/account/orders"} className="dropdown-item remove-blue-background text-end">
            Orders
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider bg-secondary" />
        </li>
        <li>
          <Link to={"/account/addresses"} className="dropdown-item remove-blue-background text-end" href="#dropdown">
            Addresses
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider bg-secondary" />
        </li>
        <li>
          <Link to={"/account/settings"} className="dropdown-item remove-blue-background text-end" href="#dropdown">
            Settings
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider bg-secondary" />
        </li>
        <li>
          <Link to={"/admin/dashboard"} className="dropdown-item remove-blue-background text-end" href="#dropdown">
            Admin
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider bg-secondary" />
        </li>
        <li>
          <a className="dropdown-item remove-blue-background text-end" href="#dropdown">
            Logout
          </a>
        </li>
      </ul>
    </div>

    // <Link to={"/login"} className="btn btn-link p-0">
    // <i className="bi bi-person-fill"></i>
    // </Link>
  );
};

export default Account;
