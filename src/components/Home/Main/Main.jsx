import "../../../App.css";
import "./Main.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <section id="main" className="position-relative vh-100">
      <div className="d-flex position-relative main-bg-image">
        {/* Dark overlay, zIndex used to position homepage content above the overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

        <div className="container d-flex flex-column align-items-center justify-content-center position-relative">
          <h1 className="text-center text-white fw-bold pb-3">
            LOREM IPSUM <br />
            LOREM IPSUM LOREM IPSUM
          </h1>
          <h3 className="text-center text-white pb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Exercitationem earum voluptatum animi veniam fuga non eligendi numquam id.
          </h3>
          <Link to="/shop">
            <button className="btn px-5 fw-bold custom-button fs-2">Shop Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Main;
