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
  const fetchCartProducts = async () => {
    setCartLoading(true);

    // Fetch cart products
    const response = await getCartProducts();

    if (response.success) {
      setCartProducts(response.response);
    } else {
      setCartError(response.error);
      setCartProducts([]); // Clear the products array
    }

    setCartLoading(false);
  };

  // Fetch the cart products when the user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartProducts();
    }
  }, [isAuthenticated]);

  // Clear the products array when the user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setCartProducts([]);
    }
  }, [isAuthenticated]);

  // Return the context provider including the state and functions
  return <BasketContext.Provider value={{ isBasketVisible, toggleBasketVisibility, cartProducts, cartLoading, cartError, fetchCartProducts }}>{children}</BasketContext.Provider>;
};
