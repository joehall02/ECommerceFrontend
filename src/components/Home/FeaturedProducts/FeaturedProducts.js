import React, { useState, useEffect } from "react";
import "./FeaturedProducts.css";
import Product from "./Product/Product";
import { getFeaturedProducts } from "../../../api/product";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisable, setIsVisable] = useState(true);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFeaturedProducts();

      if (response.success) {
        setFeaturedProducts(response.products);
      } else {
        setIsVisable(false);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    isVisable && (
      <section id="featured-products">
        <div className="container py-5">
          <div className="row justify-content-center">
            {loading ? (
              <div className="d-flex justify-content-center">
                <div class="spinner-border" role="status" />
              </div>
            ) : (
              <>
                {featuredProducts.map((product, index) => (
                  <div className="col-12 col-lg-3" key={index}>
                    <Product image={product.image_path} name={product.name} category={product.category_name} price={product.price} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProducts;
