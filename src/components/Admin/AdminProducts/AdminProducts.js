import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import "./AdminProducts.css";
import "../../../App.css";
import { getAdminProducts, deleteProduct } from "../../../api/product";
import DialogBox from "../../DialogBox/DialogBox";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminProducts();

      if (response.success) {
        setError("");
        setProducts(response.products);
        setLoading(false);
      } else {
        setError(response.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle deleting a product
  const handleProductDelete = (product_id) => {
    setProductToDelete(product_id);
    setShowDialog(true);
  };

  // confirm deleting a product
  const confirmDelete = async () => {
    if (productToDelete) {
      const response = await deleteProduct(productToDelete);

      if (response.success) {
        setProducts(products.filter((product) => product.id !== productToDelete)); // Remove the product from the products list
        setDeleteError("");
      } else {
        setDeleteError(response.message);
      }

      setProductToDelete(null); // Reset the product to delete
      setShowDialog(false); // Close the dialog box
    }
  };

  // Cancel deleting a product
  const cancelDelete = () => {
    setProductToDelete(null);
    setShowDialog(false);
  };

  return (
    <section id="admin-products" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold mt-4">Products</h2>

          <Link to={"/admin/products/new-product"} className="btn btn-dark px-4 rounded-0 fw-bold my-auto">
            New Product
          </Link>
        </div>

        {/* Display loading message */}
        {/* Else show error message */}
        {/* Else show products */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div class="spinner-border" role="status" />
          </div>
        ) : error ? (
          <p>{error}</p>
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
                    <td className="w-15">{product.price}</td>
                    <td className="w-15">{product.stock}</td>
                    <td className="w-35 text-end">
                      <Link to={`/admin/products/product-details/${product.id}`} className="btn btn-dark rounded-0 btn-sm me-2">
                        Details
                      </Link>
                      <button className="btn btn-danger rounded-0 btn-sm" onClick={() => handleProductDelete(product.id)}>
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

        {/* Delete error message */}
        <div className="error-container">{deleteError && <p className="text-danger m-0">{deleteError}</p>}</div>

        {/* Dialog box */}
        {showDialog && (
          <DialogBox
            title="Confirm Deletion"
            message="Are you sure you want to delete this product? This will also delete all associated product images."
            toggleOpen={cancelDelete}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </section>
  );
};

export default AdminProducts;
