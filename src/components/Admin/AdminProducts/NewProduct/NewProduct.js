import React, { useState, useEffect } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";
import { createProduct } from "../../../../api/product";
import { deleteProduct } from "../../../../api/product";
import { addProductImages } from "../../../../api/product";
import { addFeaturedProduct } from "../../../../api/product";
import { getCategories } from "../../../../api/category";
import { useNavigate } from "react-router-dom";
import "../../../../App.css";

const NewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    featured_product: "2", // Default to No
    category_id: "", // Initially empty
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    // If the input is a file, set the value to the file itself, else set the value to the input value
    if (e.target.type === "file") {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });

      // If the input is the category dropdown, set the category_id to the selected value
      if (e.target.name === "productCategory") {
        setProduct({ ...product, category_id: e.target.value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object for product data
    const productData = { ...product };
    delete productData.featured_product; // Remove featuredProduct from the product data
    delete productData.image; // Remove image from the product data

    console.log(productData);

    // Send a POST request to the server to create a new product
    const response = await createProduct(productData);

    // If response a success, get product_id from the response
    // and send a POST request to the server to add the product images
    if (response.success) {
      const product_id = response.response.product_id;

      // If the product is a featured product, send a POST request to the server to add the product as a featured product
      if (product.featured_product === "1") {
        const featuredResponse = await addFeaturedProduct(product_id);

        if (!featuredResponse.success) {
          setError(featuredResponse.message);
          await deleteProduct(product_id); // Delete the product if it fails to be a featured product
          return;
        }
      }

      // Create FormData object
      const imageFormData = new FormData();
      imageFormData.append("image", product.image);

      // Send a POST request to the server to add the product images
      const imageResponse = await addProductImages(product_id, imageFormData);

      if (imageResponse.success) {
        navigate("/admin/products");
      } else {
        setError(imageResponse.message);
        await deleteProduct(product_id); // Delete the product if it fails to add the product images
      }
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Get all categories when the component mounts
    const fetchData = async () => {
      const response = await getCategories();

      if (response.success) {
        setCategories(response.categories);
      } else {
        setError(response.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set the category_id to the first category in the categories array once the categories are loaded
    if (categories.length > 0) {
      setProduct((prevProduct) => ({ ...prevProduct, category_id: categories[0].id }));
    }
  }, [categories]);

  return (
    <section id="new-product" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">New Product</h2>

          <Link to={"/admin/products"}>Go back</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body py-4">
              <div className="column">
                {/* Name */}
                <label htmlFor="name" className="form-label fw-bold">
                  Product Name
                </label>
                <input type="text" className="form-control mb-3" id="name" name="name" placeholder="Product 1" value={product.name} onChange={handleInputChange} required />

                {/* Price */}
                <label htmlFor="price" className="form-label fw-bold">
                  Price (£)
                </label>
                <input type="number" className="form-control mb-3" id="price" name="price" placeholder="10.50" value={product.price} onChange={handleInputChange} required />

                {/* Description */}
                <label htmlFor="description" className="form-label fw-bold">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control mb-3"
                  id="description"
                  name="description"
                  placeholder="Product Description..."
                  value={product.description}
                  onChange={handleInputChange}
                  required
                />

                {/* Stock */}
                <label htmlFor="stock" className="form-label fw-bold">
                  Stock
                </label>
                <input type="text" className="form-control mb-3" id="stock" name="stock" placeholder="57" value={product.stock} onChange={handleInputChange} required />

                {/* Featured Product */}
                <label htmlFor="featured_product" className="form-label fw-bold">
                  Featured Product
                </label>
                <select className="form-select mb-3" id="featured_product" name="featured_product" value={product.featured_product} onChange={handleInputChange} required>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>

                {/* Category */}
                <label htmlFor="productCategory" className="form-label fw-bold">
                  Category
                </label>
                <select className="form-select mb-3" id="productCategory" name="productCategory" value={product.category_id} onChange={handleInputChange} required>
                  {/* Maps the categories */}
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image */}
          <label htmlFor="image" className="form-label fw-bold mt-3">
            Product Image
          </label>
          <input type="file" className="form-control mb-3" id="image" name="image" onChange={handleInputChange} required />

          <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
            Submit
          </button>

          {/* Error Message */}
          <div className="error-container">{error && <p className="text-danger m-0">{error}</p>}</div>
        </form>
      </div>
    </section>
  );
};

export default NewProduct;
