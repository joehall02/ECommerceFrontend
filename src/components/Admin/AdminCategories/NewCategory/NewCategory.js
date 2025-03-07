import React, { useEffect, useState } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import { createCategory } from "../../../../api/category";
import "../../../../App.css";
import Error from "../../../Error/Error";

const NewCategory = () => {
  const [category, setCategory] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const [charNameCount, setCharNameCount] = useState(0);

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    // Set the category state with the input value
    setCategory({ ...category, [e.target.name]: e.target.value });

    // Update the character count for the name input
    setCharNameCount(e.target.value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object for category data
    const categoryData = { ...category };

    // Send a POST request to the server to create a new category
    const response = await createCategory(categoryData);

    // If the response is a success, redirect to the categories page
    if (response.success) {
      setError("");
      navigate("/admin/categories");
    } else {
      setError(response.message);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body py-4">
              <div className="column">
                {/* Name */}
                <label htmlFor="name" className="form-label fw-bold">
                  Category Name
                </label>
                <input type="text" className="form-control mb-3" id="name" name="name" placeholder="Category 1" value={category.name} onChange={handleInputChange} maxLength={20} required />
                <div className="d-flex justify-content-end">
                  <small className="text-muted">{charNameCount}/20</small>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
            Submit
          </button>

          {/* Error message */}
          {error && <Error message={error} setError={setError} />}
        </form>
      </div>
    </section>
  );
};

export default NewCategory;
