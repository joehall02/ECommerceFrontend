import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../api/user";
import { AuthContext } from "../../../../contexts/AuthContext";
import Error from "../../../Error/Error";

const DeleteAccount = () => {
  const [error, setError] = useState("");
  const { handleLogout } = useContext(AuthContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    setButtonDisabled(true);

    const response = await deleteAccount();

    if (response.success) {
      setError("");
      handleLogout();
      navigate("/");
    } else {
      setError(response.message);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <section id="delete-account" className="container min-vh-100 my-3 d-flex justify-content-center">
      <div className="col-12 col-lg-8 col-xl-6 d-flex align-items-center justify-content-center my-auto row pb-5">
        <div className="d-flex justify-content-between align-items-center mb-5 px-0">
          <h2 className="fw-bold text-start mb-0">Delete Account</h2>
          <Link to={"/account/settings"}>Go Back</Link>
        </div>

        <div className="card">
          <div className="card-body py-5">
            <div className="d-flex justify-content-center row">
              <h2 className="fw-bold text-center mb-5">Are you sure?</h2>
              <p className="text-center">This action cannot be undone. Once deleted you will no longer have access to this account or any data associated with it, please continue with caution.</p>

              <button type="submit" className="btn btn-danger mt-4 px-5 py-2 rounded-0 fw-bold w-auto" onClick={handleDelete} disabled={buttonDisabled}>
                Delete Account
              </button>
            </div>

            {/* Error message */}
            {error && <Error message={error} setError={setError} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteAccount;
