import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { editPassword } from "../../../../api/user";
import "../../../../App.css";
import Error from "../../../Error/Error";

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    const response = await editPassword(data);

    if (response.success) {
      setError("");
      navigate("/account/settings");
    } else {
      setError(response.message);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "new_password") {
      setNewPassword(e.target.value);
    } else if (e.target.name === "confirm_password") {
      setConfirmPassword(e.target.value);
    } else {
      setCurrentPassword(e.target.value);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <section id="edit-password" className="container min-vh-100 my-3 py-5 d-flex justify-content-center">
      <div className="col-12 col-lg-8 col-xl-6 d-flex align-items-center justify-content-center my-auto row">
        <div className="d-flex justify-content-between align-items-center mb-5 px-0">
          <h2 className="fw-bold text-start mb-0">Change Password</h2>
          <Link to={"/account/settings"}>Go Back</Link>
        </div>

        <div className="card">
          <div className="card-body py-5">
            <form onSubmit={handleSubmit}>
              <div className="column">
                <label htmlFor="current_password" className="form-label fw-bold">
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control mb-3"
                  id="current_password"
                  name="current_password"
                  placeholder="********"
                  onChange={handleInputChange}
                  value={currentPassword}
                  required
                />

                <label htmlFor="new_password" className="form-label fw-bold">
                  New Password
                </label>
                <input type="password" className="form-control mb-3" id="new_password" name="new_password" placeholder="********" onChange={handleInputChange} value={newPassword} required />

                <label htmlFor="confirm_password" className="form-label fw-bold">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control mb-3"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="********"
                  onChange={handleInputChange}
                  value={confirmPassword}
                  required
                />
                <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
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

export default EditPassword;
