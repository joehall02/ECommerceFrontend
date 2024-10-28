import "./Home.css";
import "../../App.css";
import React from "react";

function Main() {
  return (
    <section id="main" className="position-relative">
      {/* Dark overlay, zIndex used to position homepage content above the overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 1 }}></div>

      <div className="container d-flex flex-column align-items-center justify-content-center vh-100" style={{ zIndex: 2, position: "relative" }}>
        <h1 className="text-center text-white fw-bold pb-3">
          LOREM IPSUM <br />
          LOREM IPSUM LOREM IPSUM
        </h1>
        <h3 className="text-center text-white pb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
          Exercitationem earum voluptatum animi veniam fuga non eligendi numquam id.
        </h3>
        <a className="btn px-5 py-2 fw-bold custom-button" href="#shop">
          Shop Now
        </a>
      </div>
    </section>
  );
}

export default Main;
