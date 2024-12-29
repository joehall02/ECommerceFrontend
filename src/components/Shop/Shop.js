import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "./Product/Product";
import { getProducts } from "../../api/product";

const Shop = () => {
  const [selectedItem, setSelectedItem] = useState("Name (A-Z)");
  const [products, setProducts] = useState([]);
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
      const response = await getProducts();

      if (response.success) {
        setProducts(response.products);
        setLoading(false);
      } else {
        setError(response.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="shop">
      <div className="container min-vh-100 my-5 py-5">
        {/* Category heading and sort by button */}
        <div className="d-flex justify-content-between pb-3">
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

        {/* Products */}
        <div className="row justify-content-start">
          {/* Loading */}
          {loading ? (
            <div className="d-flex justify-content-center">
              <div class="spinner-border" role="status" />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="col-12 col-lg-4">
                <Product image={product.image_path} name={product.name} price={product.price} />
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Shop;
