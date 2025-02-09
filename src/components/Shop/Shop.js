import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "./Product/Product";
import { getProducts } from "../../api/product";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

const Shop = () => {
  const [selectedItem, setSelectedItem] = useState("Name (A-Z)");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts(currentPage);

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
    };

    fetchData();
  }, [currentPage]);

  return (
    <section id="shop" className="d-flex min-vh-100">
      <div className="container flex-grow-1 d-flex flex-column mt-5 py-5">
        {/* Category heading and sort by button */}
        <div className="d-flex justify-content-between column pb-3">
          <h2 className="text-start text-dark fw-bold mb-0">All Product</h2>

          <div className="d-flex column align-items-center">
            <p className="mb-0 me-3">Sort By</p>
            <div className="btn-group">
              <button className="btn btn-outline-secondary dropdown-toggle rounded-0" data-bs-toggle="dropdown">
                {selectedItem}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Name (A-Z)")}>
                    Name (A-Z)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Name (Z-A)")}>
                    Name (Z-A)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Price (Low to High)")}>
                    Price (Low to High)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect("Price (High to Low)")}>
                    Price (High to Low)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {products.length > 0 && <small>{totalProducts} Products Total</small>}

        {/* Products */}
        <div className="row justify-content-start">
          {/* Loading */}
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status" />
            </div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="col-12 col-lg-4">
                <Link to={`/shop/product-page/${product.id}`} className="text-decoration-none">
                  <Product image={product.image_path} name={product.name} category={product.category_name} price={product.price} />
                </Link>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
              <p>No products in stock at the moment. Please come back later!</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {products.length > 0 && (
          <div className="mt-auto">
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
