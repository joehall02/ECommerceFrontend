import React, { useState, useEffect } from "react";
import "./../../../../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateAddress, getAddressById } from "../../../../api/address";
import Error from "../../../Error/Error";

const EditAddress = () => {
  const { address_id } = useParams();

  const [address, setAddress] = useState({
    full_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    postcode: "",
  });
  const [editedAddress, setEditedAddress] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEditedAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if not changes made, navigate back to addresses
    if (Object.keys(editedAddress).length === 0) {
      navigate("/account/addresses");
    } else {
      // Create a JSON object for address data
      const addressData = { ...editedAddress };

      // Send a PUT request to the server to create a new address
      const response = await updateAddress(address_id, addressData);

      if (response.success) {
        setError("");
        navigate("/account/addresses");
      } else {
        setError(response.message);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Fetch address when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAddressById(address_id);

      if (response.success) {
        setError("");
        setAddress(response.response);
      } else {
        navigate("/account/addresses");
      }

      setLoading(false);
    };

    fetchData();
  }, [address_id, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="add-address" className="container min-vh-100 my-3 py-5 d-flex justify-content-center column">
      {/* Contact form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
        <div className="col-10 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-5 px-0">
            <h2 className="fw-bold text-start">Edit Address</h2>
            <Link to={"/account/addresses"}>Go Back</Link>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status" />
            </div>
          ) : (
            <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit} style={{ minHeight: "650px" }}>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label fw-bold">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    name="full_name"
                    placeholder="John Doe"
                    value={editedAddress.full_name || address.full_name}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p>{editedAddress.full_name || address.full_name}</p>
                )}
              </div>

              {/* Address Line 1 */}
              <div className="mb-3">
                <label htmlFor="address_line_1" className="form-label fw-bold">
                  Address Line 1
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    id="address_line_1"
                    name="address_line_1"
                    placeholder="16 Main Street"
                    value={editedAddress.address_line_1 || address.address_line_1}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p>{editedAddress.address_line_1 || address.address_line_1}</p>
                )}
              </div>

              {/* Address Line 2 */}
              <div className="mb-3">
                <label htmlFor="address_line_2" className="form-label fw-bold">
                  Address Line 2 (Optional)
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    id="address_line_2"
                    name="address_line_2"
                    placeholder="Apartment 10"
                    value={editedAddress.address_line_2 || address.address_line_2}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{editedAddress.address_line_2 || address.address_line_2}</p>
                )}
              </div>

              {/* City */}
              <div className="mb-3">
                <label htmlFor="city" className="form-label fw-bold">
                  City
                </label>
                {isEditing ? (
                  <input type="text" className="form-control" id="city" name="city" placeholder="Manchester" value={editedAddress.city || address.city} onChange={handleInputChange} />
                ) : (
                  <p>{editedAddress.city || address.city}</p>
                )}
              </div>

              {/* Postcode */}
              <div className="mb-3">
                <label htmlFor="postcode" className="form-label fw-bold">
                  Postcode
                </label>
                {isEditing ? (
                  <input type="text" className="form-control" id="postcode" name="postcode" placeholder="MB7 8IY" value={editedAddress.postcode || address.postcode} onChange={handleInputChange} />
                ) : (
                  <p>{editedAddress.postcode || address.postcode}</p>
                )}
              </div>

              {/* Edit button */}
              <button type="button" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto" onClick={() => handleEdit()}>
                {isEditing ? "Done" : "Edit"}
              </button>

              {/* Submit button */}
              <button type="submit" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto">
                Submit
              </button>

              {/* Error message */}
              {error && <Error message={error} setError={setError} />}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditAddress;
