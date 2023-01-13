import React from "react";
import "../assets/css/EditControls.css";
import CancelIconWhite from "../assets/svgs/cancel_icon_white.svg";
import AcceptIconWhite from "../assets/svgs/accept_icon_white.svg";
import { useNavigate } from "react-router-dom";

/**
 * Control-Buttons für Bearbeitungsseiten (Bestätigung/Abbrechen)
 * @param onConfirmClick
 * @returns {JSX.Element}
 * @constructor
 */
export function EditControls({ onConfirmClick }) {
  const navigate = useNavigate();

  return (
    <div className="edit-controls-container">
      <div className="edit-controls">
        <div className="edit-controls-link" onClick={() => navigate(-1)}>
          <img className="edit-controls-icon" src={CancelIconWhite} alt="Edit icon" />
        </div>
        <span className="edit-controls-divider" />
        <div className="edit-controls-link" onClick={onConfirmClick}>
          <img className="edit-controls-icon" src={AcceptIconWhite} alt="Edit icon" />
        </div>
      </div>
    </div>
  );
}
