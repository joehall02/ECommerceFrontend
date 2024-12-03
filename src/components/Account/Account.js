import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Account.css";
import { AuthContext } from "../../contexts/AuthContext";

const Account = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  return (
    <div className="dropdown">
      {/* Conditionally render account icon based on whether a user is logged in */}
      {isAuthenticated ? (
        <Link className="btn btn-link p-0" data-bs-toggle="dropdown">
          <i className="bi bi-person-fill"></i>
        </Link>
      ) : (
        <Link to={"/login"} className="btn btn-link p-0">
          <i className="bi bi-person-fill"></i>
        </Link>
      )}

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
          <Link to={"/login"} onClick={handleLogout} className="dropdown-item remove-blue-background text-end" href="#dropdown">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Account;
