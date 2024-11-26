import React, { useState, useEffect } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [productDetails, setProductDetails] = useState({
    productId: 1521,
    productName: "Product 1",
    productPrice: "£10.50",
    productDescription: "Product Description...",
    productStock: 57,
    featuredProduct: "Yes",
    productCategory: "Category 1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  return (
    <section id="product-details" className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="container my-5 py-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">
            Product Number <span className="text-danger">#{productDetails.productId}</span>
          </h2>
          <Link to={"/admin/products"}>Go back</Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h5 className="fw-bold my-auto">Product Details</h5>
          </div>
          <div className="card-body py-4">
            <form>
              <div className="column">
                {/* Name */}
                <label htmlFor="productName" className="form-label fw-bold">
                  Product Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="productName"
                    name="productName"
                    placeholder="Product 1"
                    value={productDetails.productName}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p>{productDetails.productName}</p>
                )}

                {/* Price */}
                <label htmlFor="productPrice" className="form-label fw-bold">
                  Price
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="productPrice"
                    name="productPrice"
                    placeholder="£10.50"
                    value={productDetails.productPrice}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p>{productDetails.productPrice}</p>
                )}

                {/* Description */}
                <label htmlFor="productDescription" className="form-label fw-bold">
                  Description
                </label>
                {isEditing ? (
                  <textarea
                    type="text"
                    className="form-control mb-3"
                    id="productDescription"
                    name="productDescription"
                    placeholder="Product Description..."
                    value={productDetails.productDescription}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p>{productDetails.productDescription}</p>
                )}

                {/* Stock */}
                <label htmlFor="productStock" className="form-label fw-bold">
                  Stock
                </label>
                {isEditing ? (
                  <input type="text" className="form-control mb-3" id="productStock" name="productStock" placeholder="57" value={productDetails.productStock} onChange={handleInputChange} required />
                ) : (
                  <p>{productDetails.productStock}</p>
                )}

                {/* Featured Product */}
                <label htmlFor="featuredProduct" className="form-label fw-bold">
                  Featured Product
                </label>

                {isEditing ? (
                  <select className="form-select mb-3" id="featuredProduct" name="featuredProduct" value={productDetails.featuredProduct} onChange={handleInputChange} required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                ) : (
                  <p>{productDetails.featuredProduct}</p>
                )}

                {/* Category */}
                <label htmlFor="productCategory" className="form-label fw-bold">
                  Category
                </label>

                {isEditing ? (
                  <select className="form-select mb-3" id="productCategory" name="productCategory" value={productDetails.productCategory} onChange={handleInputChange} required>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                  </select>
                ) : (
                  <p>{productDetails.productCategory}</p>
                )}
              </div>

              <button type="button" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto" onClick={() => handleEdit()}>
                {isEditing ? "Done" : "Edit"}
              </button>
            </form>
          </div>
        </div>

        {/* Image */}
        <label htmlFor="productImage" className="form-label fw-bold mt-3">
          Product Image
        </label>
        <input type="file" className="form-control mb-3" id="productImage" name="productImage" required multiple />

        {/* Image carousel */}
        <div id="productImageCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#productImageCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#productImageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://loremflickr.com/320/320" className="d-block w-100" alt="Product 1" />
            </div>
            <div className="carousel-item">
              <img src="https://loremflickr.com/320/320" className="d-block w-100" alt="Product 2" />
            </div>
          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
