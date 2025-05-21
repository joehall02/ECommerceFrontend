import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link, useParams } from "react-router-dom";
import "./AdminProducts.css";
import "../../../App.css";
import { getAdminProducts, deleteProduct } from "../../../api/product";
import DialogBox from "../../DialogBox/DialogBox";
import Pagination from "../../Pagination/Pagination";
import Error from "../../Error/Error";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { category_id } = useParams();

  // Handle deleting a product
  const handleProductDelete = (product_id) => {
    setProductToDelete(product_id);
  };

  // confirm deleting a product
  const confirmDelete = async () => {
    if (productToDelete) {
      setButtonDisabled(true);

      const response = await deleteProduct(productToDelete);

      if (response.success) {
        setDeleteError("");
        fetchProducts();
        setButtonDisabled(false);
      } else {
        setDeleteError(response.message);
        setButtonDisabled(false);
      }

      setProductToDelete(null); // Reset the product to delete
    }
  };

  // Cancel deleting a product
  const cancelDelete = () => {
    setProductToDelete(null);
  };

  // Use useCallback to memoize the function and prevent unnecessary re-renders
  const fetchProducts = useCallback(async () => {
    setLoading(true);

    let response = null;

    const params = {
      page: currentPage,
    };

    // If a category_id is present, add it to the params and fetch products for that category
    if (category_id) {
      params.category_id = category_id;
      response = await getAdminProducts(params);
    } else {
      response = await getAdminProducts(params);
    }

    if (response.success) {
      setError("");
      setProducts(response.response.products);
      setTotalPages(response.response.total_pages);
      setCurrentPage(response.response.current_page);
      setTotalProducts(response.response.total_products);
    } else {
      setError(response.message);
    }

    setLoading(false);
  }, [currentPage, category_id]); // Fetch products when currentPage changes

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section id="admin-products" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container flex-grow-1 d-flex flex-column my-5 min-vh-100">
        <div className="d-flex justify-content-between mt-3">
          <h2 className="fw-bold">Products</h2>

          <Link to={"/admin/products/new-product"} className="btn btn-dark px-4 rounded-0 fw-bold my-auto">
            New Product
          </Link>
        </div>

        {products.length > 0 && <small>{totalProducts} Products Total</small>}

        {/* Display loading message */}
        {/* Else show error message */}
        {/* Else show products */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <Error message={error} setError={setError} />
        ) : products.length > 0 ? (
          <div className="d-flex mt-5">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="w-10">
                    #
                  </th>
                  <th scope="col" className="w-25">
                    Name
                  </th>
                  <th scope="col" className="w-15">
                    Price
                  </th>
                  <th scope="col" className="w-15">
                    Stock
                  </th>
                  <th scope="col" className="w-35 text-end actions-header">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <th scope="row" className="w-10">
                      {product.id}
                    </th>
                    <td className="w-25">{product.name}</td>
                    <td className="w-15">£{product.price}</td>
                    <td className="w-15">{product.stock}</td>
                    <td className="w-35 text-end">
                      <Link to={`/admin/products/product-details/${product.id}`} className="btn btn-dark rounded-0 btn-sm me-2">
                        Details
                      </Link>
                      <button className="btn btn-danger rounded-0 btn-sm" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => handleProductDelete(product.id)} disabled={buttonDisabled}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products available</p>
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="mt-auto">
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}

        {/* Delete error message */}
        {deleteError && <Error message={deleteError} setError={setDeleteError} />}

        {/* Dialog box */}
        <DialogBox
          title="Confirm Deletion"
          message="Are you sure you want to delete this product? This will also delete all associated product images."
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </section>
  );
};

export default AdminProducts;
