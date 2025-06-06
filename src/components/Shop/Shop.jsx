import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "./Product/Product";
import { getProducts } from "../../api/product";
import { getAllCategories } from "../../api/category";
import Pagination from "../Pagination/Pagination";
import { Link, useSearchParams } from "react-router-dom";
import Error from "../Error/Error";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Get current page, sort by, and category from search params
  // Default if not specified
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const selectedSortBy = searchParams.get("sort_by") || "";
  const selectedCategoryId = searchParams.get("category") || "";

  // Handle category selection and update search params
  const handleCategorySelect = (item) => {
    const newParams = new URLSearchParams(searchParams);
    if (item) {
      newParams.set("category", item.id);
    } else {
      newParams.delete("category");
      setSelectedCategory(""); // Reset selected category if "Shop All" is selected
    }
    newParams.set("page", 1); // Reset to first page when category changes
    setSearchParams(newParams);
  };

  // Handle sort by selection and update search params
  const handleSortBySelect = (item) => {
    const newParams = new URLSearchParams(searchParams);
    if (item) {
      newParams.set("sort_by", item);
    } else {
      newParams.delete("sort_by");
    }
    newParams.set("page", 1); // Reset to first page when sort by changes
    setSearchParams(newParams);
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  }, [currentPage, selectedCategory, selectedSortBy]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCategories();

      if (response.success) {
        setError("");
        setCategories(response.categories);
      } else {
        setError(response.message);
      }
    };

    fetchData();
  }, []);

  // Set selected category based on the selectedCategoryId from search params
  useEffect(() => {
    if (categories.length > 0 && selectedCategoryId) {
      const found = categories.find((category) => category.id.toString() === selectedCategoryId);

      if (found) {
        setSelectedCategory(found);
      } else if (!selectedCategoryId) {
        setSelectedCategory("");
      }
    }
  }, [categories, selectedCategoryId]);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const params = {
        page: currentPage,
      };

      if (selectedCategoryId) {
        params.category_id = selectedCategoryId;
      }

      if (selectedSortBy) {
        params.sort_by = selectedSortBy;
      }

      const response = await getProducts(params);

      if (response.success) {
        setError("");
        setProducts(response.response.products);
        setTotalPages(response.response.total_pages);
        setTotalProducts(response.response.total_products);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [currentPage, selectedCategoryId, selectedSortBy]);

  return (
    <section id="shop" className="d-flex min-vh-100">
      <div className="container flex-grow-1 d-flex flex-column mt-5">
        {/* Category heading and sort by button */}
        <div className="d-sm-flex justify-content-between pb-3">
          <h2 className="text-start text-dark align-self-center fw-bold mb-0">All Product</h2>

          {/* Dropdown */}
          <div className="row g-1 mt-sm-0 mt-3">
            {/* Category Selection */}
            <div className="col-6">
              <div className="btn-group w-100">
                <button className="btn btn-outline-secondary dropdown-toggle rounded-0 w-100 text-truncate" data-bs-toggle="dropdown">
                  {selectedCategory.name || "Select Category"}
                </button>
                <ul className="dropdown-menu w-100">
                  <li>
                    <button className="dropdown-item" onClick={() => handleCategorySelect("")}>
                      Shop All
                    </button>
                  </li>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <li key={category.id}>
                        <button className="dropdown-item text-truncate" onClick={() => handleCategorySelect(category)}>
                          {category.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            {/* Sort By Selection */}
            <div className="col-6">
              <div className="btn-group w-100">
                <button className="btn btn-outline-secondary dropdown-toggle rounded-0 w-100 text-truncate" data-bs-toggle="dropdown">
                  {selectedSortBy || "Sort By"}
                </button>
                <ul className="dropdown-menu w-100">
                  <li>
                    <button className="dropdown-item text-truncate" onClick={() => handleSortBySelect("")}>
                      Recommended
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-truncate" onClick={() => handleSortBySelect("Name (A-Z)")}>
                      Name (A-Z)
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-truncate" onClick={() => handleSortBySelect("Name (Z-A)")}>
                      Name (Z-A)
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-truncate" onClick={() => handleSortBySelect("Price (Low to High)")}>
                      Price (Low to High)
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-truncate" onClick={() => handleSortBySelect("Price (High to Low)")}>
                      Price (High to Low)
                    </button>
                  </li>
                </ul>
              </div>
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
            <Error message={error} setError={setError} />
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <Link to={`/shop/product-page/${product.id}`} className="text-decoration-none">
                  <Product image={product.image_path} name={product.name} category={product.category_name} price={product.price} />
                </Link>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center text-center" style={{ height: "75vh" }}>
              <p>No products in stock at the moment. Please come back later!</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {products.length > 0 && (
          <div className="mt-auto py-5">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={(page) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("page", page);
                setSearchParams(newParams);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
