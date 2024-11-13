import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const EditName = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <section id="edit-name" className="container min-vh-100 my-3 py-5 d-flex justify-content-center">
      <div className="col-12 col-lg-8 col-xl-6 d-flex align-items-center justify-content-center my-auto row">
        <div className="d-flex justify-content-between align-items-center mb-5 px-0">
          <h2 className="fw-bold text-start mb-0">Change Name</h2>
          <Link to={"/account/settings"}>Go Back</Link>
        </div>

        <div className="card">
          <div className="card-body py-5">
            <form>
              <div className="column">
                <label htmlFor="fullName" className="form-label fw-bold">
                  Full Name
                </label>
                <input type="text" className="form-control mb-3" id="fullName" name="fullName" placeholder="John Doe" required />
                <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditName;
