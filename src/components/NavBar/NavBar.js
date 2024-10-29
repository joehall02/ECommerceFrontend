import "./NavBar.css";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false); // State to store the toggle status of the navbar
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992); // Detect if the screen is mobile

  // Function to handle the toggle of the navbar
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleNavLinkClick = () => {
    setNavbarOpen(false);
  };

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
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
      <div className="container d-flex justify-content-between position-relative">
        {/* Brand Name */}
        <a className="navbar-brand" href="#main" onClick={handleNavLinkClick}>
          E-commerce-site
        </a>

        {/* Cart Icon and Profile Icon Rendering based on screen size */}
        {/* Only visible on mobile */}
        {isMobile && (
          <div className="d-flex align-items-center">
            <a href="#cart" className="me-3">
              <i className="bi bi-bag-fill"></i>
            </a>
            <a href="#profile">
              <i className="bi bi-person-fill"></i>
            </a>
            <button className="navbar-toggler" type="button" onClick={handleToggle} aria-controls="navbarNav" aria-expanded={navbarOpen ? "true" : "false"} aria-label="Toggle navigation">
              {navbarOpen ? <i className="bi bi-x-lg toggle-icon" /> : <i className="bi bi-list toggle-icon" />}
            </button>
          </div>
        )}

        {/* Collapsible Navbar and links */}
        <div className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-center align-items-center mx-auto w-100">
            <li className="nav-item">
              <a className="nav-link" href="#main" onClick={handleNavLinkClick}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#shop" onClick={handleNavLinkClick}>
                Shop
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={handleNavLinkClick}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Only visible on Desktop */}
        {!isMobile && (
          <div className="d-flex align-items-center desktop-icons">
            <a href="#cart" className="me-3">
              <i className="bi bi-bag-fill"></i>
            </a>
            <a href="#profile">
              <i className="bi bi-person-fill"></i>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
