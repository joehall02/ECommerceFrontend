import React, { useState, useEffect, useContext } from "react";
import "./ProductPage.css";
import "../../../App.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById, getProductImage } from "../../../api/product";
import { getCategoryById } from "../../../api/category";
import { addProductToCart } from "../../../api/cart";
import { BasketContext } from "../../../contexts/BasketContext";
import Error from "../../Error/Error";

const ProductPage = () => {
  const { product_id } = useParams(); // Get the product id from the URL
  const { toggleBasketVisibility, fetchCartProducts } = useContext(BasketContext); // Get basket visaibility and fetchCartProducts function from the BasketContext
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState("1");
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    stock: "",
    category_id: "",
    image_path: "",
  });
  const [category, setCategory] = useState({
    id: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const maxItems = Math.min(product.stock, 5);

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (product_id, quantity) => async () => {
    // Create a JSON object for product data
    const productData = {
      quantity: quantity,
    };

    const response = await addProductToCart(product_id, productData);

    if (response.success) {
      toggleBasketVisibility(); // Show the basket
      fetchCartProducts(); // Fetch the cart products
      setError("");
    } else {
      setError(response.message);
    }
  };

  // Fetch product by id when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // If the product has been deleted, redirect to shop
      if (product_id === "null") {
        navigate("/shop");
        return;
      }

      const response = await getProductById(product_id);

      if (response.success) {
        setError("");
        setProduct(response.response);

        // Get the image path
        const imageResponse = await getProductImage(product_id);

        if (imageResponse.success) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            image_path: imageResponse.response.image_path,
          }));
        } else {
          setError(imageResponse.message);
        }
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [product_id, navigate]);

  // Fetch category by id when the component mounts and the product state is set
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategoryById(product.category_id);

      if (response.success) {
        setError("");
        setCategory(response.response);
      } else {
        setError(response.message);
      }
    };

    fetchData();
  }, [product]);

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="product-page">
      <div className="container min-vh-100 d-flex align-items-center justify-content-center my-5 my-lg-0 py-5">
        {/* Loading */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <Error message={error} setError={setError} />
        ) : (
          <div className="d-flex flex-column align-items-center">
            <Link to={"/shop"} className="mb-3 ms-3 text-dark text-decoration-none me-auto">
              <i className="bi bi-arrow-left me-2" />
              Back to Shop
            </Link>
            <div className="row w-100">
              {/* Image */}
              <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                <img src={"https://storage.googleapis.com/" + product.image_path} className="img-fluid" alt={product.name} />
              </div>

              {/* Product details */}
              <div className="col-12 col-lg-6 d-flex justify-content-between flex-column">
                <div className="mt-auto">
                  <h2 className="fw-bold">{product.name}</h2>
                  <h3>{category.name}</h3>
                  <h4 className="mb-5">£{product.price}</h4>
                  <div className="">
                    <h4>About this item</h4>
                    <p className="mb-5 flex-grow-1">{product.description}</p>
                  </div>
                </div>

                {/* Quantity dropdown and add to basket button */}
                <div className="d-flex justify-content-between justify-content-lg-start mt-auto">
                  <div className="btn-group me-3">
                    <button className="btn btn-outline-secondary dropdown-toggle rounded-0" data-bs-toggle="dropdown">
                      Quantity: {selectedItem}
                    </button>
                    <ul className="dropdown-menu">
                      {/* Create a list of 5 dropdown items */}
                      {Array.from({ length: maxItems }, (_, i) => (
                        <li key={i}>
                          <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect(i + 1)}>
                            {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="btn shop-button px-5 fs-5" onClick={handleAddToCart(product_id, selectedItem)}>
                    Add to Basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
