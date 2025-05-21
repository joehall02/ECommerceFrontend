import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFullName } from "../../../api/user";
import { AuthContext } from "../../../contexts/AuthContext";
import Error from "../../Error/Error";

const Settings = () => {
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFullName();

      if (response.success) {
        setError("");
        setFullName(response.response.full_name);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <section id="settings" className="container min-vh-100 my-3 d-flex justify-content-center">
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center my-auto row pb-5">
        <h2 className="fw-bold text-start mb-5 px-0">My Settings</h2>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <Error message={error} setError={setError} />
        ) : (
          <div className="card">
            <div className="card-body d-flex justify-content-between py-5 border-bottom">
              <div className="column">
                <h5 className="card-title">Name</h5>
                <p className="card-text">{fullName}</p>
              </div>
              <Link to={"/account/settings/edit-name"} className="btn btn-dark px-5 rounded-0 fw-bold my-auto align-self-start text-decoration-none">
                Edit
              </Link>
            </div>
            <div className="card-body d-flex justify-content-between py-5 border-bottom">
              <div className="column">
                <h5 className="card-title">Password</h5>
                <p className="card-text">********</p>
              </div>
              <Link to={"/account/settings/edit-password"} className="btn btn-dark px-5 rounded-0 fw-bold my-auto align-self-start text-decoration-none">
                Edit
              </Link>
            </div>

            {!isAdmin && (
              <div className="card-body d-flex justify-content-center py-5 align-items-center">
                <Link to={"/account/settings/delete-account"} className="btn btn-danger rounded-0 fw-bold py-2 px-5 w-100 text-decoration-none">
                  Delete Account
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Settings;
