import React from "react";

const Error = ({ message, setError }) => {
  return (
    <div
      className="alert alert-danger alert-dismissible text-center fade show d-flex align-items-center position-fixed top-0 start-50 translate-middle-x col-11 col-md-6 p-3 mt-3 text-break"
      style={{ zIndex: 1050 }}
      role="alert"
    >
      <i className="bi fs-4 bi-exclamation-square-fill me-2" /> {message}
      <button className="btn fs-3 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError("")}>
        <i className="bi bi-x-lg" />
      </button>
    </div>
  );
};

export default Error;
