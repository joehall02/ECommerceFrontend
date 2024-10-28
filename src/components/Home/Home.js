import React from "react";
import "./Home.css";
import Main from "./Main";
import Categories from "./Categories";
import About from "./About";
import Contact from "./Contact";
import FeaturedProducts from "./FeaturedProducts";

function Home() {
  return (
    <div>
      <Main />
      <FeaturedProducts />
      <About />
      <Categories />
      <Contact />
    </div>
  );
}

export default Home;
