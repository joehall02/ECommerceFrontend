import React, { useState, useContext } from "react";
import "./Product.css";
import "../../../App.css";
import { editProductQuantityInCart } from "../../../api/cart";
import { deleteProductFromCart } from "../../../api/cart";
import { BasketContext } from "../../../contexts/BasketContext";

const Product = ({ image_path, name, category_name, price, quantity, cart_product_id }) => {
  const [selectedItem, setSelectedItem] = useState(quantity);
  const [error, setError] = useState("");

  const { fetchCartProducts } = useContext(BasketContext); // Get fetchCartProducts function from the BasketContext

  const handleDropdownSelect = async (item) => {
    setSelectedItem(item);
    await handleChangeQuantity(item);
  };

  const handleChangeQuantity = async (item) => {
    // Set the item to an integer
    item = parseInt(item);

    console.log(cart_product_id);

    // Create a JSON object for product data
    const productData = {
      quantity: item,
    };

    // Update the quantity in the cart
    const response = await editProductQuantityInCart(cart_product_id, productData);

    if (response.success) {
      setError("");
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
        <img src={"https://storage.googleapis.com/" + image_path} alt={name} style={{ width: "75px", height: "75px" }} />

        {/* Product details */}
        <div className="d-flex flex-column ms-3">
          <span className="text-break">{name}</span>
          <span>{category_name}</span>
          <span className="">£{price}</span>
        </div>

        {/* Dropdown */}
        <div className="btn-group ms-auto">
          <button className="btn btn-outline-light rounded-0" data-bs-toggle="dropdown">
            {selectedItem} <i className="bi bi-caret-down-fill"></i>
          </button>
          <ul className="dropdown-menu">
            {[1, 2, 3, 4, 5].map((num) => (
              <li key={num}>
                <a className="dropdown-item" href="#dropdown" onClick={() => handleDropdownSelect(num)}>
                  {num}
                </a>
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
      {error && <p className="text-danger m-0">{error}</p>}

      {/* Grey separator */}
      <div className="flex-grow-1 border-top border-secondary"></div>
    </>
  );
};

export default Product;
