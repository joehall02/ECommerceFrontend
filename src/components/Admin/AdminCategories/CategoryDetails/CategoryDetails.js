import React, { useState, useEffect } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";

const CategoryDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    categoryId: 1521,
    categoryName: "Category 1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryDetails({ ...categoryDetails, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  return (
    <section id="category-details" className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="container my-5 py-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">
            Category Number <span className="text-danger">#{categoryDetails.categoryId}</span>
          </h2>
          <Link to={"/admin/categories"}>Go back</Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h5 className="fw-bold my-auto">Category Details</h5>
          </div>
          <div className="card-body py-4">
            <form>
              <div className="column">
                {/* Name */}
                <label htmlFor="categoryName" className="form-label fw-bold">
                  Category Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="categoryName"
                    name="categoryName"
                    placeholder="Category 1"
                    value={categoryDetails.categoryName}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p>{categoryDetails.categoryName}</p>
                )}
              </div>

              <button type="button" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto" onClick={() => handleEdit()}>
                {isEditing ? "Done" : "Edit"}
              </button>
            </form>
          </div>
        </div>

        <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default CategoryDetails;
