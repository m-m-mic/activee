import React from "react";
import CancelIconWhite from "../assets/svgs/cancel_icon_white.svg";
import AcceptIconWhite from "../assets/svgs/accept_icon_white.svg";
import { useNavigate } from "react-router-dom";

export function EditControls({ onConfirmClick }) {
  const navigate = useNavigate();

  return (
    <div className="profile-edit-options">
      <div className="profile-edit-link" onClick={() => navigate(-1)}>
        <img className="profile-edit-icon" src={CancelIconWhite} alt="Edit icon" />
      </div>
      <span className="profile-edit-divider" />
      <div className="profile-edit-link" onClick={onConfirmClick}>
        <img className="profile-edit-icon" src={AcceptIconWhite} alt="Edit icon" />
      </div>
    </div>
  );
}
