import React, { useEffect, useState, useCallback } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import "./AdminCategories.css";
import { getCategories, deleteCategory } from "../../../api/category";
import DialogBox from "../../DialogBox/DialogBox";
import Pagination from "../../Pagination/Pagination";
import Error from "../../Error/Error";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Handle deleting a category
  const handleCategoryDelete = (category_id) => {
    setCategoryToDelete(category_id);
  };

  // Confirm deleting a category
  const confirmDelete = async () => {
    if (categoryToDelete) {
      setButtonDisabled(true);

      const response = await deleteCategory(categoryToDelete);

      if (response.success) {
        setDeleteError("");
        fetchCategories();
        setButtonDisabled(false);
      } else {
        setDeleteError(response.message);
        setButtonDisabled(false);
      }

      setCategoryToDelete(null); // Reset the category to delete
    }
  };

  // Cancel deleting a category
  const cancelDelete = () => {
    setCategoryToDelete(null);
  };

  // Use useCallback to memoize the function and prevent unnecessary re-renders
  const fetchCategories = useCallback(async () => {
    setLoading(true);

    const response = await getCategories(currentPage);

    if (response.success) {
      setError("");
      setCategories(response.response.categories);
      setTotalPages(response.response.total_pages);
      setCurrentPage(response.response.current_page);
      setTotalCategories(response.response.total_categories);
    } else {
      setError(response.message);
    }

    setLoading(false);
  }, [currentPage]); // Fetch categories when currentPage changes

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section id="admin-categories" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container flex-grow-1 d-flex flex-column my-5 min-vh-100">
        <div className="d-flex justify-content-between mt-3">
          <h2 className="fw-bold">Categories</h2>

          <Link to={"/admin/categories/new-category"} className="btn btn-dark px-4 rounded-0 fw-bold my-auto">
            New Category
          </Link>
        </div>

        {categories.length > 0 && <small>{totalCategories} Categories Total</small>}

        {/* Display loading message */}
        {/* Else show error message */}
        {/* Else show categories */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <Error message={error} setError={setError} />
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
                      <Link to={`/admin/products/${category.id}`} className="btn btn-dark rounded-0 btn-sm me-2">
                        Products
                      </Link>
                      <Link to={`/admin/categories/category-details/${category.id}`} className="btn btn-dark rounded-0 btn-sm me-2">
                        Details
                      </Link>
                      <button className="btn btn-danger rounded-0 btn-sm" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => handleCategoryDelete(category.id)} disabled={buttonDisabled}>
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

        {/* Pagination */}
        {categories.length > 0 && (
          <div className="mt-auto">
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}

        {/* Delete Error message */}
        {deleteError && <Error message={deleteError} setError={setDeleteError} />}

        {/* Dialog Box */}
        <DialogBox
          title="Confirm Deletion"
          message="Are you sure you want to delete this category? This will also delete all associated products and their product images."
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </section>
  );
};

export default AdminCategories;
