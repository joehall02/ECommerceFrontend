import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../../../App.css";
import { addFeaturedProduct, getProductById, addProductImages, checkFeaturedProduct, getProductImage, updateProduct, deleteFeaturedProduct } from "../../../../api/product";
import { getAllCategories } from "../../../../api/category";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import Error from "../../../Error/Error";

const ProductDetails = () => {
  const { product_id } = useParams();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    stock: "",
    category_id: "",
    featured_product: "",
    image_path: "",
  });
  const [editedProduct, setEditedProduct] = useState({});
  const [featuredProductId, setFeaturedProductId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);

  const handleInputChange = async (e) => {
    // If the input is a file, set the value to the file itself, else set the value to the input value
    if (e.target.type === "file") {
      const file = e.target.files[0];

      // Display the image preview
      if (file) {
        // setEditedProduct({ ...editedProduct, [e.target.name]: file });
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
      // Set the value to the input value
      let newValue = e.target.value;

      // If the input is a number, parse the value to a float
      if (e.target.type === "number") {
        newValue = parseFloat(newValue);
      }

      // If the input is the category dropdown, set the category_id to the selected value
      if (e.target.name === "product_category") {
        newValue = parseInt(newValue, 10); // Ensure category_id is an integer
        // If the category_id is the same as the product category_id, remove the category_id from editedProduct
        if (newValue === product.category_id) {
          const { category_id: removed, ...rest } = editedProduct;
          setEditedProduct(rest);
        } else {
          setEditedProduct({ ...editedProduct, category_id: newValue });
        }
      } else {
        // If the input from editedProduct is the same as produce, remove the value from editedProduct
        if (newValue === product[e.target.name]) {
          const { [e.target.name]: removed, ...rest } = editedProduct;
          setEditedProduct(rest);
        } else {
          setEditedProduct({ ...editedProduct, [e.target.name]: newValue });
        }
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
    setEditedProduct((prevProduct) => {
      const { image_path, ...rest } = prevProduct;
      return { ...rest, image: croppedFile };
    });
    setSelectedFile(croppedFile);
    setCropping(false); // Hide cropping UI
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the product has not been edited, set the error message
    if (Object.keys(editedProduct).length === 0) {
      setError("No changes have been made.");
    } else {
      // Create a JSON object for product data
      const productData = { ...editedProduct };
      delete productData.featured_product; // Remove featuredProduct from the product data
      delete productData.image; // Remove image from the product data

      let productEditSuccess = true;

      // Only call updateProduct if there are fields to update
      if (Object.keys(productData).length > 0) {
        // Send a PUT request to the server to edit the product
        const response = await updateProduct(product_id, productData);

        if (!response.success) {
          setError(response.message);
          productEditSuccess = false;
        }
      }

      // Handle featured product
      if (editedProduct.featured_product !== undefined && productEditSuccess) {
        // if featured product === "Yes" and productEditSuccess is true, add the product as a featured product
        if (editedProduct.featured_product === "Yes") {
          const featuredResponse = await addFeaturedProduct(product_id);

          // If the response is not a success, set the error message
          if (!featuredResponse.success) {
            setError("Failed to add product as a featured product.");
          }
          // if featured product === "No" and productEditSuccess is true, remove the product as a featured product
        } else if (editedProduct.featured_product === "No") {
          const deleteFeaturedResponse = await deleteFeaturedProduct(featuredProductId);

          // If the response is not a success, set the error message
          if (!deleteFeaturedResponse.success) {
            setError("Failed to remove product as a featured product.");
          }
        }
      }

      // Handle image upload
      if (editedProduct.image && productEditSuccess) {
        // Create FormData object
        const imageFormData = new FormData();
        imageFormData.append("image", editedProduct.image);

        // Send a POST request to the server to add the product images
        const imageResponse = await addProductImages(product_id, imageFormData);

        if (!imageResponse.success) {
          setError("Failed to add product image.");
        }
      }

      // Navigate to the products page if everything is successful
      if (productEditSuccess) {
        navigate("/admin/products");
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setCropping(false);
    // Remove the image from the editedProduct object
    setEditedProduct((prevProduct) => {
      const { image, ...rest } = prevProduct;
      return rest;
    });
    document.getElementById("image").value = "";
  };

  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  }, []);

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

  // Fetch product by id when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductById(product_id);

      if (response.success) {
        setError("");
        setProduct(response.response);

        // Get the image path
        const imageResponse = await getProductImage(product_id);

        if (imageResponse.success) {
          setError("");
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
    };

    fetchData();
  }, [product_id]);

  // Check if the product is a featured product when the component mounts
  useEffect(() => {
    if (product.id) {
      const fetchFeaturedStatus = async () => {
        // Try to check if the product is a featured product, if it fails, set the featured_product to "No"
        // if the error status is 400, else set the error message
        try {
          const response = await checkFeaturedProduct(product.id);
          if (response.success) {
            setProduct((prevProduct) => ({
              ...prevProduct,
              featured_product: "Yes",
            }));
            setFeaturedProductId(response.response.id); // Set the featured product id
          } else {
            setProduct((prevProduct) => ({
              ...prevProduct,
              featured_product: "No",
            }));
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setProduct((prevProduct) => ({
              ...prevProduct,
              featured_product: "No",
            }));
          } else {
            setError("Failed to check featured product status");
          }
        }
        setLoading(false); // Set loading to false once the request is complete
      };

      fetchFeaturedStatus();
    }
  }, [product.id]);

  // Revoke the image preview URL when the component unmounts, to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <section id="product-details" className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="container my-5 py-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">Product Number {loading ? <div className="spinner-border" role="status" /> : <span className="text-danger">#{product.id}</span>}</h2>
          <Link to={"/admin/products"}>Go back</Link>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h5 className="fw-bold my-auto">Product Details</h5>
              </div>
              <div className="card-body py-4">
                <div className="column">
                  {/* Name */}
                  <label htmlFor="name" className="form-label fw-bold">
                    Product Name
                  </label>
                  {isEditing ? (
                    <input type="text" className="form-control mb-3" id="name" name="name" placeholder="Product 1" value={editedProduct.name || product.name} onChange={handleInputChange} required />
                  ) : (
                    <p>{editedProduct.name || product.name}</p>
                  )}

                  {/* Price */}
                  <label htmlFor="price" className="form-label fw-bold">
                    Price
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      className="form-control mb-3"
                      id="price"
                      name="price"
                      placeholder="£10.50"
                      value={editedProduct.price || product.price}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <p>{editedProduct.price || product.price}</p>
                  )}

                  {/* Description */}
                  <label htmlFor="description" className="form-label fw-bold">
                    Description
                  </label>
                  {isEditing ? (
                    <textarea
                      type="text"
                      className="form-control mb-3"
                      id="description"
                      name="description"
                      placeholder="Product Description..."
                      value={editedProduct.description || product.description}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <p>{editedProduct.description || product.description}</p>
                  )}

                  {/* Stock */}
                  <label htmlFor="stock" className="form-label fw-bold">
                    Stock
                  </label>
                  {isEditing ? (
                    // ?? is the nullish coalescing operator, it returns the right-hand operand if the left-hand operand is null or undefined, allowing the value to be 0
                    <input type="number" className="form-control mb-3" id="stock" name="stock" placeholder="57" value={editedProduct.stock ?? product.stock} onChange={handleInputChange} required />
                  ) : (
                    <p>{editedProduct.stock ?? product.stock}</p>
                  )}

                  {/* Featured Product */}
                  <label htmlFor="featured_product" className="form-label fw-bold">
                    Featured Product
                  </label>

                  {isEditing ? (
                    <select
                      className="form-select mb-3"
                      id="featured_product"
                      name="featured_product"
                      value={editedProduct.featured_product || product.featured_product}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <p>{editedProduct.featured_product || product.featured_product}</p>
                  )}

                  {/* Category */}
                  <label htmlFor="product_category" className="form-label fw-bold">
                    Category
                  </label>

                  {isEditing ? (
                    <select className="form-select mb-3" id="product_category" name="product_category" value={editedProduct.category_id || product.category_id} onChange={handleInputChange} required>
                      {/* Maps categories */}
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // if the product category id matches the category id, display the category name, else display
                    // <p>{categories.map((category) => (category.id === product.category_id ? category.name : null))}</p>

                    // Filter the categories array to find the category with the same id as the editedProduct or product category id, then map the category name
                    <p>{categories.filter((category) => String(category.id) === String(editedProduct.category_id || product.category_id)).map((category) => category.name)}</p>
                  )}
                </div>

                <button type="button" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto" onClick={() => handleEdit()}>
                  {isEditing ? "Done" : "Edit"}
                </button>
              </div>
            </div>

            {/* Image */}
            <label htmlFor="image" className="form-label fw-bold mt-3">
              Product Image
            </label>
            <div className="d-flex align-items-center mb-3">
              <input type="file" className="form-control" id="image" name="image" onChange={handleInputChange} />
              {selectedFile && (
                <button type="button" className="btn btn-danger ms-2" onClick={handleRemoveFile}>
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

            {/* Display image */}
            {/* Display preview image if image is uploaded, else show current product image */}
            {!cropping && <img src={previewImage || "https://storage.googleapis.com/" + product.image_path} className="d-block w-100" alt={product.name} />}

            {/* Save changes button */}
            <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
              Save Changes
            </button>

            {/* Error message */}
            {error && <Error message={error} setError={setError} />}
          </form>
        )}

        {/* Image carousel
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

          <button className="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ProductDetails;
