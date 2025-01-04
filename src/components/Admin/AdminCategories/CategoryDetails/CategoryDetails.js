import React, { useState, useEffect } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCategoryById } from "../../../../api/category";
import { updateCategory } from "../../../../api/category";
import "../../../../App.css";

const CategoryDetails = () => {
  const { category_id } = useParams();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState({
    id: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object for category data
    const categoryData = { ...category };

    // Send a PUT request to the server to update the category
    const response = await updateCategory(categoryData);

    if (response.success) {
      setEditError("");
      navigate("/admin/categories");
    } else {
      setEditError(response.message);
    }
  };

  // Fetch category by id when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategoryById(category_id);

      if (response.success) {
        setCategory(response.response);
        setLoading(false);
        setError("");
      } else {
        setError(response.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [category_id]); // Fetch data when the category_id changes, i.e. when the component mounts

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  return (
    <section id="category-details" className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="container my-5 py-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">Category Number {loading ? <div class="spinner-border" role="status" /> : <span className="text-danger">#{category.id}</span>}</h2>
          <Link to={"/admin/categories"}>Go back</Link>
        </div>
        {/* Display loading message */}
        {/* Else show error messag */}
        {/* Else show category details */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div class="spinner-border" role="status" />
          </div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h5 className="fw-bold my-auto">Category Details</h5>
              </div>
              <div className="card-body py-4">
                <div className="column">
                  {/* Name */}
                  <label htmlFor="name" className="form-label fw-bold">
                    Category Name
                  </label>
                  {isEditing ? (
                    <input type="text" className="form-control mb-3" id="name" name="name" placeholder="Category 1" value={category.name} onChange={handleInputChange} required />
                  ) : (
                    <p>{category.name}</p>
                  )}
                </div>

                <button type="button" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto" onClick={() => handleEdit()}>
                  {isEditing ? "Done" : "Edit"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
              Save Changes
            </button>

            {/* Edit error message */}
            <div className="error-container">{editError && <p className="text-danger m-0">{editError}</p>}</div>
          </form>
        )}
      </div>
    </section>
  );
};

export default CategoryDetails;
