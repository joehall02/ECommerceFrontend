import React from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import "./AdminCategories.css";

const AdminCategories = () => {
  const sampleCategories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
    { id: 4, name: "Category 4" },
  ];

  return (
    <section id="admin-categories" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold mt-4">Categories</h2>

          <Link to={"/admin/categories/new-category"} className="btn btn-dark px-4 rounded-0 fw-bold my-auto">
            New Category
          </Link>
        </div>

        <div className="d-flex mt-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col" className="text-end actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleCategories.map((category, index) => (
                <tr key={index}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td className="text-end">
                    <button className="btn btn-dark rounded-0 btn-sm me-2">Products</button>
                    <Link to={"/admin/categories/category-details"} className="btn btn-dark rounded-0 btn-sm me-2">
                      Details
                    </Link>
                    <button className="btn btn-danger rounded-0 btn-sm">Delete</button>
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

export default AdminCategories;
