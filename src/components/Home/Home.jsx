import Main from "./Main/Main";
// import Categories from "./Categories/Categories";
import About from "./About/About";
import Contact from "./Contact/Contact";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

const Home = () => {
  return (
    <div>
      <Main />
      <FeaturedProducts />
      <About />
      {/* <Categories /> */}
      <Contact />
    </div>
  );
};

export default Home;
