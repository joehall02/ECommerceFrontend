import React, { useEffect } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";

const NewProduct = () => {
  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  return (
    <section id="new-product" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">New Product</h2>

          <Link to={"/admin/products"}>Go back</Link>
        </div>

        <div className="card">
          <div className="card-body py-4">
            <form>
              <div className="column">
                {/* Name */}
                <label htmlFor="productName" className="form-label fw-bold">
                  Product Name
                </label>
                <input type="text" className="form-control mb-3" id="productName" name="productName" placeholder="Product 1" required />

                {/* Price */}
                <label htmlFor="productPrice" className="form-label fw-bold">
                  Price
                </label>
                <input type="text" className="form-control mb-3" id="productPrice" name="productPrice" placeholder="£10.50" required />

                {/* Description */}
                <label htmlFor="productDescription" className="form-label fw-bold">
                  Description
                </label>
                <textarea type="text" className="form-control mb-3" id="productDescription" name="productDescription" placeholder="Product Description..." required />

                {/* Stock */}
                <label htmlFor="productStock" className="form-label fw-bold">
                  Stock
                </label>
                <input type="text" className="form-control mb-3" id="productStock" name="productStock" placeholder="57" required />

                {/* Featured Product */}
                <label htmlFor="featuredProduct" className="form-label fw-bold">
                  Featured Product
                </label>
                <select className="form-select mb-3" id="featuredProduct" name="featuredProduct" required>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>

                {/* Category */}
                <label htmlFor="productCategory" className="form-label fw-bold">
                  Category
                </label>
                <select className="form-select mb-3" id="productCategory" name="productCategory" required>
                  <option value="1">Category 1</option>
                  <option value="2">Category 2</option>
                  <option value="3">Category 3</option>
                  <option value="4">Category 4</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Image */}
        <label htmlFor="productImage" className="form-label fw-bold mt-3">
          Product Image
        </label>
        <input type="file" className="form-control mb-3" id="productImage" name="productImage" required multiple />

        <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
          Submit
        </button>
      </div>
    </section>
  );
};

export default NewProduct;
