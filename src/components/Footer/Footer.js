import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container py-3 text-center">
        <div className="d-flex align-items-center justify-content-center my-3">
          <div className="flex-grow-1 border-top border-secondary"></div>
          <div className="d-flex justify-content-center mx-3">
            <i className="footer-icons px-3 bi bi-instagram"></i>
            <i className="footer-icons px-3 bi bi-facebook"></i>
            <i className="footer-icons px-3 bi bi-tiktok"></i>
            <i className="footer-icons px-3 bi bi-twitter"></i>
          </div>
          <div className="flex-grow-1 border-top border-secondary"></div>
        </div>
        <p className="text-white">Copyright © 2024 Brand, Inc.</p>
        <p className="text-white">testemail@gmail.com</p>
        <p className="text-white">0110923974</p>
      </div>
    </footer>
  );
}

export default Footer;
