import React, { createContext, useState, useEffect, useContext } from "react";
import { getCartProducts } from "../api/cart";
import { AuthContext } from "./AuthContext";

export const BasketContext = createContext(); // Create a context

// Basket context used to manage the state of the basket across the application
// This context provides the visibility of the basket, the products in the basket, and functions to toggle the visibility and fetch the products
// This allows the basket items to be refreshed when a product is added or removed

export const BasketProvider = ({ children }) => {
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState("");

  // Toggle the visibility of the basket
  const toggleBasketVisibility = () => {
    setIsBasketVisible(!isBasketVisible);
  };

  // Get the isAuthenticated state from the AuthContext to check if the user is logged in
  const { isAuthenticated } = useContext(AuthContext);

  // Function to fetch the cart products
  const fetchCartProducts = async (withLoading = false) => {
    // If setLoading is true, set the cartLoading state to true
    // Only used for adding products, not for editing or deleting products
    if (withLoading) {
      setCartLoading(true);
    }

    // Fetch cart products
    const response = await getCartProducts();

    if (response.success) {
      setCartProducts(response.response);
    } else {
      setCartError(response.message);
      setCartProducts([]); // Clear the products array
    }

    // Set the cartLoading state to false after fetching the products
    if (withLoading) {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the cart products when the user logs in
    if (isAuthenticated) {
      fetchCartProducts();
    } else {
      // Clear the products array when the user logs out
      setCartProducts([]);
      setCartLoading(false);
    }
  }, [isAuthenticated]);

  // Return the context provider including the state and functions
  return <BasketContext.Provider value={{ isBasketVisible, toggleBasketVisibility, cartProducts, cartLoading, cartError, setCartError, fetchCartProducts }}>{children}</BasketContext.Provider>;
};
