import React from "react";

const DialogBox = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="modal fade" id="modal" tabIndex="-1">
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onCancel} />
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger px-4 rounded-0 btn" data-bs-dismiss="modal" onClick={onConfirm}>
              Yes
            </button>
            <button className="btn btn-dark px-4 rounded-0 btn" data-bs-dismiss="modal" onClick={onCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
