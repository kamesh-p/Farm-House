import React from "react";
import "../style/dialog.css";

function Dialog({ onClose, children }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
