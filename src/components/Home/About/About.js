import React from "react";
import "./About.css";

const About = () => {
  return (
    <section id="about" className="position-relative">
      {/* Dark overlay, zIndex used to position homepage content above the overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 1 }}></div>

      <div className="container d-flex flex-column align-items-start justify-content-center vh-100 py-5" style={{ zIndex: 2, position: "relative" }}>
        <div className="col-12 col-lg-8 text-center text-lg-start">
          <h1 className="text-white">Our Story</h1>
          <p className="text-white custom-line-height">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore saepe eligendi sunt rem. Tenetur similique ut suscipit autem, praesentium minus dolore iste veniam, impedit ipsum, velit
            explicabo sapiente quam esse. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, beatae. Perferendis est magnam, neque incidunt ex esse nulla nesciunt cupiditate reprehenderit
            quos hic inventore soluta sunt ipsam a eligendi mollitia? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore veritatis, saepe dignissimos esse enim perspiciatis consequuntur
            nihil? Esse officiis, neque asperiores illo quam facere iste nam, temporibus aliquid nostrum blanditiis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
