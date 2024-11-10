import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="dropdown">
      <Link className="btn btn-link p-0" data-bs-toggle="dropdown">
        <i className="bi bi-person-fill"></i>
      </Link>

      <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
        <li>
          <a className="dropdown-item text-end" href="#dropdown">
            Orders
          </a>
        </li>
        <li>
          <hr className="dropdown-divider bg-secondary" />
        </li>
        <li>
          <a className="dropdown-item text-end" href="#dropdown">
            Addresses
          </a>
        </li>
        <li>
          <hr className="dropdown-divider bg-secondary" />
        </li>
        <li>
          <a className="dropdown-item text-end" href="#dropdown">
            Settings
          </a>
        </li>
        <li>
          <hr className="dropdown-divider bg-secondary" />
        </li>
        <li>
          <a className="dropdown-item text-end" href="#dropdown">
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
