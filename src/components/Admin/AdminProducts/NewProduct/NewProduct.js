import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { createProduct, deleteProduct, addFeaturedProduct, addProductImages } from "../../../../api/product";
import { getAllCategories } from "../../../../api/category";
import { Link, useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import "../../../../App.css";
import Error from "../../../Error/Error";

const NewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    featured_product: "No", // Default to No
    category_id: "", // Initially empty
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    // If the input is a file, set the value to the file itself, else set the value to the input value
    if (e.target.type === "file") {
      const file = e.target.files[0];

      if (file) {
        // setProduct({ ...product, [e.target.name]: e.target.files[0] });
        // setPreviewImage(URL.createObjectURL(file));
        // setSelectedFile(file);

        try {
          // Compress the image
          const options = {
            maxSizeKB: 300,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          };

          const compressedFile = await imageCompression(file, options);
          const compressedImageUrl = URL.createObjectURL(compressedFile);

          // Store the compressed image in the state
          setSelectedFile(compressedFile);
          setPreviewImage(compressedImageUrl);
          setCropping(true); // Show cropping UI
        } catch (error) {
          setError("Failed to compress the image. Please try again.");
        }
      } else {
        setPreviewImage(null);
      }
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });

      // If the input is the category dropdown, set the category_id to the selected value
      if (e.target.name === "product_category") {
        setProduct({ ...product, category_id: e.target.value });
      }
    }
  };

  // Handles cropping completion
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // function to crop and convert the image using canvas
  const getCroppedImage = async () => {
    if (!selectedFile || !croppedAreaPixels) return;

    return new Promise((resolve) => {
      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(image, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height);

        canvas.toBlob((blob) => {
          const file = new File([blob], selectedFile.name, { type: "image/jpeg" });
          resolve(file);
        }, "image/jpeg");
      };
    });
  };

  // Handles the crop button click
  const handleCropDone = async () => {
    const croppedFile = await getCroppedImage();
    setPreviewImage(URL.createObjectURL(croppedFile));
    setProduct({ ...product, image: croppedFile });
    setSelectedFile(croppedFile);
    setCropping(false); // Hide cropping UI
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setCropping(false); // Hide cropping UI
    // Remove the image from the product object
    setProduct((prevProduct) => {
      const { image, ...rest } = prevProduct;
      return rest;
    });
    document.getElementById("image").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object for product data
    const productData = { ...product };
    delete productData.featured_product; // Remove featuredProduct from the product data
    delete productData.image; // Remove image from the product data

    // Send a POST request to the server to create a new product
    const response = await createProduct(productData);

    // If response a success, get product_id from the response
    // and send a POST request to the server to add the product images
    if (response.success) {
      setError("");

      const product_id = response.response.product_id;

      // If the product is a featured product, send a POST request to the server to add the product as a featured product
      if (product.featured_product === "Yes") {
        const featuredResponse = await addFeaturedProduct(product_id);

        if (featuredResponse.success) {
          setError("");
        } else {
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
        setError("");
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
      const response = await getAllCategories();

      if (response.success) {
        setError("");
        setCategories(response.categories);
      } else {
        setError(response.message);
      }
      setLoading(false);
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

        {/* Loading */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : (
          // Product Form
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
                  <input type="number" className="form-control mb-3" id="stock" name="stock" placeholder="57" value={product.stock} onChange={handleInputChange} required />

                  {/* Featured Product */}
                  <label htmlFor="featured_product" className="form-label fw-bold">
                    Featured Product
                  </label>
                  <select className="form-select mb-3" id="featured_product" name="featured_product" value={product.featured_product} onChange={handleInputChange} required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  {/* Category */}
                  <label htmlFor="product_category" className="form-label fw-bold">
                    Category
                  </label>
                  <select className="form-select mb-3" id="product_category" name="product_category" value={product.category_id} onChange={handleInputChange} required>
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

            <div className="d-flex align-items-center mb-3">
              <input type="file" className="form-control" id="image" name="image" onChange={handleInputChange} required />
              {selectedFile && (
                <button type="button" className="btn btn-danger ms-3" onClick={handleRemoveFile}>
                  <i className="bi bi-x-lg" />
                </button>
              )}
            </div>

            {/* Cropping UI */}
            {cropping && previewImage && (
              <div>
                <div style={{ position: "relative", width: "100%", height: "300px" }}>
                  <Cropper image={previewImage} crop={crop} zoom={zoom} aspect={4 / 3} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
                </div>
                <button type="button" className="btn btn-primary mt-2" onClick={handleCropDone}>
                  Crop Image
                </button>
              </div>
            )}

            {/* Display Image */}
            {previewImage && !cropping && <img src={previewImage} className="d-block w-100" alt="Uploaded file" />}

            <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
              Submit
            </button>

            {/* Error Message */}
            {error && <Error message={error} setError={setError} />}
          </form>
        )}
      </div>
    </section>
  );
};

export default NewProduct;
