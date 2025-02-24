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
          <div className="row justify-content-center py-5">
            <h1 className="text-white text-center pb-5">Shop Our Best Sellers</h1>

            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status" />
              </div>
            ) : (
              <>
                {featuredProducts.map((product) => (
                  <div key={product.id} className="col-12 col-md-6 col-xl-3">
                    <Product id={product.id} image={product.image_path} name={product.name} category={product.category_name} price={product.price} />
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
