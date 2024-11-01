import React from "react";
import Category from "./Category/Category";
import "./Categories.css";

function Categories() {
  return (
    <section id="categories">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-4">
            <Category image="https://loremflickr.com/320/320" name="Category 1" />
          </div>
          <div className="col-12 col-lg-4">
            <Category image="https://loremflickr.com/320/320" name="Category 2" />
          </div>
          <div className="col-12 col-lg-4">
            <Category image="https://loremflickr.com/320/320" name="Category 3" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
