import React, { useEffect } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";

const NewCategory = () => {
  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });
  return (
    <section id="new-category" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">New Category</h2>

          <Link to={"/admin/categories"}>Go back</Link>
        </div>

        <div className="card">
          <div className="card-body py-4">
            <form>
              <div className="column">
                <label htmlFor="categoryName" className="form-label fw-bold">
                  Category Name
                </label>
                <input type="text" className="form-control mb-3" id="categoryName" name="categoryName" placeholder="Category 1" required />
              </div>
            </form>
          </div>
        </div>
        <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
          Submit
        </button>
      </div>
    </section>
  );
};

export default NewCategory;
