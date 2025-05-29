import React, { useState, useEffect, useContext } from "react";
import "./ProductPage.css";
import "../../../App.css";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getProductImage } from "../../../api/product";
import { getCategoryById } from "../../../api/category";
import { addProductToCart } from "../../../api/cart";
import { BasketContext } from "../../../contexts/BasketContext";
import Error from "../../Error/Error";
import { AuthContext } from "../../../contexts/AuthContext";

const ProductPage = () => {
  const { product_id } = useParams(); // Get the product id from the URL
  const { toggleBasketVisibility, fetchCartProducts } = useContext(BasketContext); // Get basket visaibility and fetchCartProducts function from the BasketContext
  const { verifyAuthentication } = useContext(AuthContext); // Get verifyAuthentication function from the AuthContext, needed to verify guest authentication
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState("1");
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [productOutOfStock, setProductOutOfStock] = useState(false);

  const maxItems = Math.min(product.stock - product.reserved_stock, 5);

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (product_id, quantity) => async () => {
    // Create a JSON object for product data
    const productData = {
      quantity: quantity,
    };

    setButtonDisabled(true); // Disable the button to prevent multiple clicks

    const response = await addProductToCart(product_id, productData);

    if (response.success) {
      toggleBasketVisibility(); // Show the basket
      fetchCartProducts(true); // Fetch the cart products and set loading to true
      verifyAuthentication(); // Verify authentication
      setError("");
      setButtonDisabled(false); // Enable the button
    } else {
      setError(response.message);
      setButtonDisabled(false); // Enable the button
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
        // setError(response.message);
        navigate("/shop");
      }

      setLoading(false);
    };

    fetchData();
  }, [product_id, navigate]);

  useEffect(() => {
    if (product.stock === 0) {
      // navigate("/shop");
      setProductOutOfStock(true);
    }
  }, [product, navigate]);

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

    if (product.category_id) {
      fetchData();
    }
  }, [product.category_id]);

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  return (
    <section id="product-page">
      <div className="container min-vh-100 d-flex flex-column my-5 my-lg-0">
        <div className="d-flex flex-column align-items-center w-100 ">
          <div className="row w-100 d-flex justify-content-center ">
            {/* Loading */}
            {loading ? (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status" />
              </div>
            ) : (
              <>
                {/* Back button */}
                <button onClick={() => navigate(-1)} className="btn btn-link mb-3 mt-lg-5 text-dark text-decoration-none text-start">
                  <i className="bi bi-arrow-left me-2" />
                  Back to Shop
                </button>

                {/* Image */}
                <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                  <img src={"https://storage.googleapis.com/" + product.image_path} className="img-fluid" alt={product.name} />
                </div>

                {/* Product details */}
                <div className="col-12 col-lg-6 d-flex flex-column">
                  <h2 className="fw-bold">{product.name}</h2>
                  <hr className="mt-0" />
                  <h4>{category.name}</h4>
                  <h4 className="mb-5">£{product.price}</h4>

                  {/* Quantity dropdown and add to basket button */}
                  <div className="d-flex flex-column justify-content-lg-start mt-auto w-100">
                    <div className={`btn-group ${!productOutOfStock ? "mb-3" : "mb-0"}`}>
                      {!productOutOfStock && (
                        <button className="btn btn-outline-secondary dropdown-toggle rounded-0 py-2 fs-5" data-bs-toggle="dropdown">
                          Quantity: {selectedItem}
                        </button>
                      )}
                      {!productOutOfStock ? (
                        maxItems !== 0 && (
                          <ul className="dropdown-menu w-100">
                            {/* Create a list of 5 dropdown items */}
                            {Array.from({ length: maxItems }, (_, i) => (
                              <li key={i}>
                                <button className="dropdown-item w-100" onClick={() => handleDropdownSelect(i + 1)}>
                                  {i + 1}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )
                      ) : (
                        <p className="text-danger fs-5 mb-0">Out of Stock.</p>
                      )}
                    </div>
                    {!productOutOfStock && (
                      <button className="btn btn-dark rounded-0 fs-5 py-2" onClick={handleAddToCart(product_id, selectedItem)} disabled={buttonDisabled}>
                        Add to Basket
                      </button>
                    )}
                  </div>
                </div>

                {/* Seperator */}
                <div className="col-12 m-3">
                  <hr />
                </div>

                {/* Product description */}
                <div className="col-12">
                  <h5>About this item</h5>
                  {/* <p className="mb-5 text-break text-wrap">{product.description}</p> */}
                  {product.description.split("\n").map((line, index) => (
                    <p key={index} className="mb-3 text-break text-wrap">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Error message */}
                {error && <Error message={error} setError={setError} />}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
