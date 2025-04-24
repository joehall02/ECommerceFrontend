import React from "react";

const Success = ({ message, setMessage }) => {
  return (
    <div
      className="alert alert-success alert-dismissible text-center fade show d-flex align-items-center position-fixed top-0 start-50 translate-middle-x col-11 col-md-6 p-3 mt-3 text-break"
      style={{ zIndex: 1050 }}
      role="alert"
    >
      <i className="bi fs-4 bi-check-square-fill me-2" /> {message}
      <button className="btn fs-3 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close" onClick={() => setMessage("")}>
        <i className="bi bi-x-lg" />
      </button>
    </div>
  );
};

export default Success;
