import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { editName } from "../../../../api/user";
import "../../../../App.css";
import Error from "../../../Error/Error";

const EditName = () => {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const nameCharCount = newName.length;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonDisabled(true);

    const data = {
      full_name: newName,
    };

    const response = await editName(data);

    if (response.success) {
      setError("");
      navigate("/account/settings");
    } else {
      setError(response.message);
      setButtonDisabled(false);
    }
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

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
            <form onSubmit={handleSubmit}>
              <div className="column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="full_name" className="form-label fw-bold m-0">
                    Full Name
                  </label>
                  <small className="text-muted">{nameCharCount}/100</small>
                </div>
                <input type="text" className="form-control mb-3" id="full_name" name="full_name" placeholder="John Doe" onChange={handleInputChange} value={newName} maxLength={100} required />
                <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto" disabled={buttonDisabled}>
                  Submit
                </button>
              </div>
            </form>
            {/* Error message */}
            {error && <Error message={error} setError={setError} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditName;
