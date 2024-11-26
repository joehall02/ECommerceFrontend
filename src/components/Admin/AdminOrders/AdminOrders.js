import React, { useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [selectedItem, setSelectedItem] = useState("Processing");

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  const sampleOrders = [
    { id: 1, name: "John Doe", price: "Processing", stock: "01/01/2021", total: "£100" },
    { id: 2, name: "Jane Doe", price: "Shipped", stock: "01/01/2021", total: "£100" },
    { id: 3, name: "John Smith", price: "Delivered", stock: "01/01/2021", total: "£100" },
    { id: 4, name: "Jane Smith", price: "Processing", stock: "01/01/2023", total: "£100" },
  ];

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
              {sampleOrders.map((product, index) => (
                <tr key={index}>
                  <th scope="row" className="w-5">
                    {product.id}
                  </th>
                  <td className="w-15">{product.name}</td>
                  <td className="w-15">{product.price}</td>
                  <td className="w-15">{product.stock}</td>
                  <td className="w-15">{product.total}</td>
                  <td className="w-35 text-end">
                    <Link to={"/admin/orders/order-details"} className="btn btn-dark rounded-0 btn-sm me-2">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminOrders;
