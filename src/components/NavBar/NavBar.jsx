import "./NavBar.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Basket from "../Basket/Basket";
import { BasketContext } from "../../contexts/BasketContext";
import Account from "../Account/Account";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false); // State to store the toggle status of the navbar
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992); // Detect if the screen is mobile
  const location = useLocation(); // Hook to get the current location
  const { isBasketVisible, toggleBasketVisibility } = useContext(BasketContext); // Context to store the visibility of the basket

  // Function to handle the toggle of the navbar
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleNavLinkClick = () => {
    setNavbarOpen(false);
  };

  const handleContactClick = () => {
    if (location.pathname === "/") {
      // If the user is on the home page, scroll to the contact section
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to the home page and scroll to the contact section
      setTimeout(() => {
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      // If the user is on the home page, scroll to the top
      document.getElementById("main").scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to the home page and scroll to the top
      setTimeout(() => {
        document.getElementById("main").scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  // const handleBasketClick = () => {
  //   setIsBasketVisible(!isBasketVisible);
  // };

  // Handle window resize events to update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark">
        <div className="container d-flex justify-content-between position-relative">
          {/* Brand Name */}
          <a className="navbar-brand" href="#main" onClick={handleNavLinkClick}>
            E-commerce-site
          </a>

          {/* Cart Icon and Profile Icon Rendering based on screen size */}
          {/* Only visible on mobile */}
          {isMobile && (
            <div className="d-flex align-items-center">
              <button className="btn btn-link me-3 p-0" onClick={toggleBasketVisibility}>
                <i className="bi bi-bag-fill"></i>
              </button>

              {/* Account component */}
              <Account />

              <button className="navbar-toggler" type="button" onClick={handleToggle} aria-controls="navbarNav" aria-expanded={navbarOpen ? "true" : "false"} aria-label="Toggle navigation">
                {navbarOpen ? <i className="bi bi-x-lg toggle-icon" /> : <i className="bi bi-list toggle-icon" />}
              </button>
            </div>
          )}

          {/* Collapsible Navbar and links */}
          <div className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav d-flex justify-content-center align-items-center mx-auto w-100">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    handleNavLinkClick();
                    handleHomeClick();
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop" className="nav-link" onClick={handleNavLinkClick}>
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    handleNavLinkClick();
                    handleContactClick();
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Only visible on Desktop */}
          {!isMobile && (
            <div className="d-flex align-items-center desktop-icons">
              <button className="btn btn-link me-3 p-0" onClick={toggleBasketVisibility}>
                <i className="bi bi-bag-fill"></i>
              </button>

              {/* Account component */}
              <Account />
            </div>
          )}
        </div>
      </nav>
      {/* Basket Component */}
      <Basket isVisible={isBasketVisible} onClose={toggleBasketVisibility} />

      {/* Overlay Background */}
      {isBasketVisible && <div className="offcanvas-backdrop fade show" onClick={toggleBasketVisibility}></div>}
    </>
  );
};

export default Navbar;
