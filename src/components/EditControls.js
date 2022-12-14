import React from "react";
import { NavLink } from "react-router-dom";
import CancelIconWhite from "../assets/svgs/cancel_icon_white.svg";
import AcceptIconWhite from "../assets/svgs/accept_icon_white.svg";

export function EditControls({ onConfirmClick }) {
  return (
    <div className="profile-edit-options">
      <NavLink className="profile-edit-link" to={`/profile`}>
        <img className="profile-edit-icon" src={CancelIconWhite} alt="Edit icon" />
      </NavLink>
      <span className="profile-edit-divider" />
      <div className="profile-edit-link" onClick={onConfirmClick}>
        <img className="profile-edit-icon" src={AcceptIconWhite} alt="Edit icon" />
      </div>
    </div>
  );
}
