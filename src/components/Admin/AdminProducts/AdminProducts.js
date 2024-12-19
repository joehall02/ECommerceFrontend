import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import "./AdminProducts.css";
import { getAdminProducts } from "../../../api/product";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminProducts();

      if (response.success) {
        setProducts(response.products);
      } else {
        setError(response.message);
      }
    };

    fetchData();
  }, []);

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

        <div className="d-flex mt-5">
          {/* Display products, else show error message, else show no products message */}
          {products.length > 0 ? (
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

              {/* Products */}
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
                      <Link to={"/admin/products/product-details"} className="btn btn-dark rounded-0 btn-sm me-2">
                        Details
                      </Link>
                      <button className="btn btn-danger rounded-0 btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{error || "No products in stock right now."}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
