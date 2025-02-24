import React, { useState, useContext } from "react";
import "../../../App.css";
import { editProductQuantityInCart, deleteProductFromCart } from "../../../api/cart";
import { BasketContext } from "../../../contexts/BasketContext";
import { Link } from "react-router-dom";
import Error from "../../Error/Error";

const Product = ({ image_path, name, category_name, price, stock, quantity, product_id, cart_product_id }) => {
  const [selectedItem, setSelectedItem] = useState(quantity);
  const [error, setError] = useState("");

  const { fetchCartProducts } = useContext(BasketContext); // Get fetchCartProducts function from the BasketContext

  const maxItems = Math.min(stock, 5);

  const handleDropdownSelect = async (item) => {
    setSelectedItem(item);
    await handleChangeQuantity(item);
  };

  const handleChangeQuantity = async (item) => {
    // Set the item to an integer
    item = parseInt(item);

    // Create a JSON object for product data
    const productData = {
      quantity: item,
    };

    // Update the quantity in the cart
    const response = await editProductQuantityInCart(cart_product_id, productData);

    if (response.success) {
      setError("");
      fetchCartProducts(); // Fetch the cart products
    } else {
      setError(response.message);
    }
  };

  const handleRemoveFromCart = async () => {
    // Delete the product from the cart
    const response = await deleteProductFromCart(cart_product_id);

    if (response.success) {
      setError("");
      fetchCartProducts(); // Fetch the cart products
    } else {
      setError(response.message);
    }
  };

  return (
    <>
      <li className="d-flex align-items-center my-3">
        {/* Product image */}
        <Link to={`/shop/product-page/${product_id}`} className="text-decoration-none">
          <img src={"https://storage.googleapis.com/" + image_path} alt={name} style={{ width: "75px", height: "75px" }} />
        </Link>

        {/* Product details */}
        <div className="d-flex flex-column ms-3" style={{ minWidth: "0" }}>
          <span className="text-truncate">{name}</span>
          <span className="text-truncate">{category_name}</span>
          <span className="text-truncate">£{price}</span>
        </div>

        {/* Dropdown */}
        <div className="btn-group ms-auto flex-shrink-0">
          <button className="btn btn-outline-dark rounded-0" data-bs-toggle="dropdown">
            {selectedItem} <i className="bi bi-caret-down-fill"></i>
          </button>
          <ul className="dropdown-menu w-100">
            {Array.from({ length: maxItems }, (_, i) => (
              <li key={i}>
                <button className="dropdown-item w-100" onClick={() => handleDropdownSelect(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Remove button */}
        <button onClick={handleRemoveFromCart} className="btn btn-danger rounded-0 ms-3">
          <i className="bi bi-trash"></i>
        </button>
      </li>

      {/* Error */}
      {error && <Error message={error} setError={setError} />}

      {/* Grey separator */}
      <div className="flex-grow-1 border-top border-secondary"></div>
    </>
  );
};

export default Product;
