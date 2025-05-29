import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container py-3 text-center">
        <div className="d-flex align-items-center justify-content-center my-3">
          <div className="flex-grow-1 border-top border-secondary"></div>
          <div className="d-flex justify-content-center mx-3">
            <a href="https://instagram.com" target="_blank">
              <i className="footer-icons px-3 bi bi-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank">
              <i className="footer-icons px-3 bi bi-facebook"></i>
            </a>
            <a href="https://tiktok.com" target="_blank">
              <i className="footer-icons px-3 bi bi-tiktok"></i>
            </a>
            <a href="https://x.com" target="_blank">
              <i className="footer-icons px-3 bi bi-twitter"></i>
            </a>
          </div>
          <div className="flex-grow-1 border-top border-secondary"></div>
        </div>
        <p className="text-white">Copyright © 2024 Brand, Inc.</p>
        <p className="text-white">testemail@gmail.com</p>
        <p className="text-white">0110923974</p>
      </div>
    </footer>
  );
};

export default Footer;
