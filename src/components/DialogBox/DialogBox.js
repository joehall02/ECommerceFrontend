import React from "react";
import "./DialogBox.css";

const DialogBox = ({ title, message, onConfirm, toggleOpen }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="d-flex justify-content-around">
          <button className="btn btn-danger px-4 rounded-0 btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn btn-dark px-4 rounded-0 btn" onClick={toggleOpen}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
