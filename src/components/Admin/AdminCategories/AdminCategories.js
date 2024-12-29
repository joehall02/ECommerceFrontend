import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import "./AdminCategories.css";
import { getCategories, deleteCategory } from "../../../api/category";
import DialogBox from "../../DialogBox/DialogBox";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategories();

      if (response.success) {
        setCategories(response.categories);
        setLoading(false);
      } else {
        setError(response.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle deleting a category
  const handleCategoryDelete = (category_id) => {
    setCategoryToDelete(category_id);
    setShowDialog(true);
  };

  // Confirm deleting a category
  const confirmDelete = async () => {
    if (categoryToDelete) {
      const response = await deleteCategory(categoryToDelete);

      if (response.success) {
        setCategories(categories.filter((category) => category.id !== categoryToDelete)); // Remove the category from the categories list
        setDeleteError("");
      } else {
        setDeleteError(response.message);
      }

      setCategoryToDelete(null); // Reset the category to delete
      setShowDialog(false); // Close the dialog box
    }
  };

  // Cancel deleting a category
  const cancelDelete = () => {
    setCategoryToDelete(null);
    setShowDialog(false);
  };

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

        {/* Display loading message */}
        {/* Else show error message */}
        {/* Else show categories */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div class="spinner-border" role="status" />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : categories.length > 0 ? (
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
                {categories.map((category, index) => (
                  <tr key={index}>
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td className="text-end">
                      <button className="btn btn-dark rounded-0 btn-sm me-2">Products</button>
                      <Link to={`/admin/categories/category-details/${category.id}`} className="btn btn-dark rounded-0 btn-sm me-2">
                        Details
                      </Link>
                      <button className="btn btn-danger rounded-0 btn-sm" onClick={() => handleCategoryDelete(category.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No categories available</p>
        )}

        {/* Delete Error message */}
        <div className="error-container">{deleteError && <p className="text-danger m-0">{deleteError}</p>}</div>

        {/* Dialog Box */}
        {showDialog && (
          <DialogBox
            title="Confirm Deletion"
            message="Are you sure you want to delete this category? This will also delete all associated products and their product images."
            toggleOpen={cancelDelete}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </section>
  );
};

export default AdminCategories;
